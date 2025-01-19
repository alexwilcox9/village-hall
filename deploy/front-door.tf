resource "azurerm_cdn_frontdoor_profile" "fd_profile" {
  name                = "wvh-fdprofile"
  resource_group_name = azurerm_resource_group.wvh.name
  sku_name            = "Standard_AzureFrontDoor"
}

resource "azurerm_cdn_frontdoor_origin_group" "fd_origin_group" {
  name                     = "wvh-origingroup"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.fd_profile.id

  load_balancing {
    sample_size                 = 4
    successful_samples_required = 3
  }

  health_probe {
    path                = "/index.html"
    request_type        = "HEAD"
    protocol            = "Https"
    interval_in_seconds = 100
  }
}

resource "azurerm_cdn_frontdoor_origin" "fd_storage_origin" {
  name                           = "wvh-origin"
  cdn_frontdoor_origin_group_id  = azurerm_cdn_frontdoor_origin_group.fd_origin_group.id
  host_name                      = azurerm_storage_account.web.primary_web_host
  origin_host_header             = azurerm_storage_account.web.primary_web_host
  certificate_name_check_enabled = false
  enabled                        = true
}

resource "azurerm_cdn_frontdoor_endpoint" "fd_endpoint" {
  name                     = "wvh-endpoint"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.fd_profile.id
}

resource "azurerm_cdn_frontdoor_route" "fd_route" {
  name                          = "wvh-route"
  cdn_frontdoor_endpoint_id     = azurerm_cdn_frontdoor_endpoint.fd_endpoint.id
  cdn_frontdoor_origin_group_id = azurerm_cdn_frontdoor_origin_group.fd_origin_group.id
  cdn_frontdoor_origin_ids      = [azurerm_cdn_frontdoor_origin.fd_storage_origin.id]

  cdn_frontdoor_custom_domain_ids = [for domain in local.domains : azurerm_cdn_frontdoor_custom_domain.fd_custom_domain[domain].id]
  cdn_frontdoor_rule_set_ids = [
    azurerm_cdn_frontdoor_rule_set.wvh.id
  ]

  patterns_to_match   = ["/*"]
  forwarding_protocol = "HttpsOnly"
  supported_protocols = ["Https", "Http"]

  cache {
    query_string_caching_behavior = "IgnoreQueryString"
    compression_enabled           = true
    content_types_to_compress     = local.compress-types
  }
}

resource "azurerm_cdn_frontdoor_custom_domain" "fd_custom_domain" {
  for_each                 = local.domains
  name                     = "${replace(each.value, ".", "-")}-domain"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.fd_profile.id
  dns_zone_id              = azurerm_dns_zone.wvh.id
  host_name                = each.value

  tls {
    certificate_type    = "ManagedCertificate"
    minimum_tls_version = "TLS12"
  }
}

resource "azurerm_cdn_frontdoor_custom_domain_association" "fd_custom_domain_association" {
  for_each                       = local.domains
  cdn_frontdoor_custom_domain_id = azurerm_cdn_frontdoor_custom_domain.fd_custom_domain[each.value].id
  cdn_frontdoor_route_ids        = [azurerm_cdn_frontdoor_route.fd_route.id]
}

resource "azurerm_cdn_frontdoor_rule_set" "wvh" {
  name                     = "wvhRuleSet"
  cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.fd_profile.id
}

resource "azurerm_cdn_frontdoor_rule" "cache" {
  depends_on = [azurerm_cdn_frontdoor_origin_group.fd_origin_group, azurerm_cdn_frontdoor_origin.fd_storage_origin]

  name                      = "cache"
  cdn_frontdoor_rule_set_id = azurerm_cdn_frontdoor_rule_set.wvh.id
  order                     = 1
  behavior_on_match         = "Continue"

  actions {
    response_header_action {
      header_action = "Overwrite"
      header_name   = "cache-control"
      value         = "max-age=15552002"
    }
  }

}

resource "azurerm_cdn_frontdoor_rule" "cache-override" {
  depends_on = [azurerm_cdn_frontdoor_origin_group.fd_origin_group, azurerm_cdn_frontdoor_origin.fd_storage_origin]

  name                      = "cacheOverride"
  cdn_frontdoor_rule_set_id = azurerm_cdn_frontdoor_rule_set.wvh.id
  order                     = 2
  behavior_on_match         = "Continue"

  actions {
    response_header_action {
      header_action = "Overwrite"
      header_name   = "cache-control"
      value         = "no-cache"
    }
  }

  conditions {
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

}

resource "azurerm_cdn_frontdoor_rule" "rewrite-to-index" {
  depends_on = [azurerm_cdn_frontdoor_origin_group.fd_origin_group, azurerm_cdn_frontdoor_origin.fd_storage_origin]

  name                      = "rewriteToIndex"
  cdn_frontdoor_rule_set_id = azurerm_cdn_frontdoor_rule_set.wvh.id
  order                     = 3
  behavior_on_match         = "Continue"

  actions {
    url_rewrite_action {
      destination             = "/"
      preserve_unmatched_path = false
      source_pattern          = "/"
    }
  }

  conditions {
    url_path_condition {
      match_values = [
        "calendar",
        "booking",
        "contact",
        "floorplan",
        "gallery",
      ]
      operator = "Equal"
      transforms = [
        "Lowercase",
      ]

    }
  }

}

resource "azurerm_cdn_frontdoor_rule" "redirect-www" {
  depends_on = [azurerm_cdn_frontdoor_origin_group.fd_origin_group, azurerm_cdn_frontdoor_origin.fd_storage_origin]

  name                      = "redirectWww"
  cdn_frontdoor_rule_set_id = azurerm_cdn_frontdoor_rule_set.wvh.id
  order                     = 4
  behavior_on_match         = "Continue"

  actions {
    url_redirect_action {
      destination_hostname = "willandvillagehall.org.uk"
      redirect_type        = "PermanentRedirect"
    }
  }

  conditions {
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
  }

}
