data "azurerm_client_config" "current" {}

data "azuread_service_principal" "cdn" {
  display_name = "Microsoft.AzureFrontDoor-Cdn"
}


resource "azurerm_key_vault" "wvh" {
  name                       = "wvh"
  location                   = azurerm_resource_group.wvh.location
  resource_group_name        = azurerm_resource_group.wvh.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    certificate_permissions = [
      "Create",
      "Delete",
      "DeleteIssuers",
      "Get",
      "GetIssuers",
      "Import",
      "List",
      "ListIssuers",
      "ManageContacts",
      "ManageIssuers",
      "Purge",
      "SetIssuers",
      "Update",
    ]

    secret_permissions = [
      "Get",
      "List",
    ]

  }

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azuread_service_principal.cdn.object_id

    certificate_permissions = [
      "Get",
      "List",
    ]
    secret_permissions = [
      "Get",
      "List",
    ]
  }

}

resource "azurerm_key_vault_certificate" "wvh-web" {
  name         = "wvh-web"
  key_vault_id = azurerm_key_vault.wvh.id

  certificate_policy {
    issuer_parameters {
      name = "Unknown"
    }

    key_properties {
      exportable = true
      key_size   = 4096
      key_type   = "RSA"
      reuse_key  = true
    }


    secret_properties {
      content_type = "application/x-pkcs12"
    }

    x509_certificate_properties {

      key_usage = [
        "digitalSignature",
        "keyEncipherment",
      ]

      subject_alternative_names {
        dns_names = [azurerm_dns_zone.wvh.name, "www.${azurerm_dns_zone.wvh.name}"]
      }

      subject            = "CN=${azurerm_dns_zone.wvh.name}"
      validity_in_months = 12
    }
  }
}
