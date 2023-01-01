resource "azurerm_cdn_profile" "wvh" {
  name                = "willandvillagehall"
  location            = "North Europe"
  resource_group_name = azurerm_resource_group.wvh.name
  sku                 = "Standard_Microsoft"

}

resource "azurerm_cdn_endpoint" "web" {
  name                      = "willandvillagehall"
  profile_name              = azurerm_cdn_profile.wvh.name
  location                  = azurerm_cdn_profile.wvh.location
  resource_group_name       = azurerm_resource_group.wvh.name
  is_http_allowed           = true
  is_https_allowed          = true
  content_types_to_compress = local.compress-types
  is_compression_enabled    = true
  optimization_type         = "GeneralWebDelivery"
  origin_host_header        = azurerm_storage_account.web.primary_web_host

  global_delivery_rule {
    modify_response_header_action {
      action = "Overwrite"
      name   = "cache-control"
      value  = "max-age=15552002"
    }
  }

  delivery_rule {
    name  = "EnforceHTTPS"
    order = 1
    request_scheme_condition {
      operator     = "Equal"
      match_values = ["HTTP"]
    }
    url_redirect_action {
      redirect_type = "Found"
      protocol      = "Https"
    }
  }

  delivery_rule {
    name  = "CacheExceptions"
    order = 2

    modify_response_header_action {
      action = "Overwrite"
      name   = "cache-control"
      value  = "no-cache"
    }

    url_file_extension_condition {
      match_values = [
        "json",
        "pdf",
        "xls",
      ]
      operator   = "Equal"
      transforms = ["Lowercase"]
    }
  }

  delivery_rule {
    name  = "RewriteToIndex"
    order = 3

    url_path_condition {
      match_values = [
        "calendar",
        "contact",
        "floorplan",
        "gallery",
      ]
      operator = "Equal"
      transforms = [
        "Lowercase",
      ]
    }
    url_rewrite_action {
      destination             = "/"
      preserve_unmatched_path = false
      source_pattern          = "/"
    }
  }

  delivery_rule {
    name  = "RedirectWWW"
    order = 4

    request_uri_condition {
      match_values = [
        "https://www.",
        "http://www.",
      ]
      operator = "BeginsWith"
      transforms = [
        "Lowercase",
      ]
    }

    url_redirect_action {
      hostname      = "willandvillagehall.org.uk"
      protocol      = "Https"
      redirect_type = "Found"
    }
  }

  origin {
    name       = "willandvillagehall"
    host_name  = azurerm_storage_account.web.primary_web_host
    https_port = 443
  }
}

resource "azurerm_cdn_endpoint_custom_domain" "root" {
  name            = "wvh"
  cdn_endpoint_id = azurerm_cdn_endpoint.web.id
  host_name       = azurerm_dns_zone.wvh.name

  user_managed_https {
    key_vault_secret_id = azurerm_key_vault_certificate.wvh-web.versionless_secret_id
  }
}

resource "azurerm_cdn_endpoint_custom_domain" "www" {
  name            = "www"
  cdn_endpoint_id = azurerm_cdn_endpoint.web.id
  host_name       = trimsuffix(azurerm_dns_cname_record.www.fqdn, ".")

  user_managed_https {
    key_vault_secret_id = azurerm_key_vault_certificate.wvh-web.versionless_secret_id
  }
}
