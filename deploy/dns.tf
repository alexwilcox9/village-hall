# Website DNS

resource "azurerm_dns_zone" "wvh" {
  name                = "willandvillagehall.org.uk"
  resource_group_name = azurerm_resource_group.wvh.name
}

resource "azurerm_dns_a_record" "web" {
  name                = "@"
  zone_name           = azurerm_dns_zone.wvh.name
  resource_group_name = azurerm_resource_group.wvh.name
  ttl                 = 300
  target_resource_id  = azurerm_cdn_endpoint.web.id
}

resource "azurerm_dns_aaaa_record" "web" {
  name                = "@"
  zone_name           = azurerm_dns_zone.wvh.name
  resource_group_name = azurerm_resource_group.wvh.name
  ttl                 = 300
  target_resource_id  = azurerm_cdn_endpoint.web.id
}

resource "azurerm_dns_cname_record" "cdnverify" {
  name                = "cdnverify"
  zone_name           = azurerm_dns_zone.wvh.name
  resource_group_name = azurerm_resource_group.wvh.name
  ttl                 = 300
  record              = "cdnverify.${azurerm_cdn_endpoint.web.fqdn}"
}

# 365 DNS

resource "azurerm_dns_mx_record" "exchange" {
  name                = "@"
  zone_name           = azurerm_dns_zone.wvh.name
  resource_group_name = azurerm_resource_group.wvh.name
  ttl                 = 300

  record {
    preference = 0
    exchange   = "willandvillagehall-org-uk.mail.protection.outlook.com"
  }
}

resource "azurerm_dns_cname_record" "autodiscover" {
  name                = "autodiscover"
  zone_name           = azurerm_dns_zone.wvh.name
  resource_group_name = azurerm_resource_group.wvh.name
  ttl                 = 3600
  record              = "autodiscover.outlook.com"
}


resource "azurerm_dns_txt_record" "root" {
  name                = "@"
  zone_name           = azurerm_dns_zone.wvh.name
  resource_group_name = azurerm_resource_group.wvh.name
  ttl                 = 3600

  record {
    value = "v=spf1 include:spf.protection.outlook.com -all"
  }
  record {
    value = "google-site-verification=ukNs-JkTMsecOalOLZPaP9SIkSIflThQ7uUEiiCJPxE"
  }
}

resource "azurerm_dns_cname_record" "dkim1" {
  name                = "selector1._domainkey"
  zone_name           = azurerm_dns_zone.wvh.name
  resource_group_name = azurerm_resource_group.wvh.name
  ttl                 = 3600
  record              = "selector1-willandvillagehall-org-uk._domainkey.WillandVillageHall.onmicrosoft.com"
}

resource "azurerm_dns_cname_record" "dkim2" {
  name                = "selector2._domainkey"
  zone_name           = azurerm_dns_zone.wvh.name
  resource_group_name = azurerm_resource_group.wvh.name
  ttl                 = 3600
  record              = "selector2-willandvillagehall-org-uk._domainkey.WillandVillageHall.onmicrosoft.com"
}

resource "azurerm_dns_txt_record" "dmarc" {
  name                = "_dmarc"
  zone_name           = azurerm_dns_zone.wvh.name
  resource_group_name = azurerm_resource_group.wvh.name
  ttl                 = 3600

  record {
    value = "v=DMARC1; p=reject; adkim=s; aspf=s;"
  }
}
