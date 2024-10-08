locals {
  compress-types = ["application/eot",
    "application/font",
    "application/font-sfnt",
    "application/javascript",
    "application/json",
    "application/opentype",
    "application/otf",
    "application/pkcs7-mime",
    "application/truetype",
    "application/ttf",
    "application/vnd.ms-fontobject",
    "application/xhtml+xml",
    "application/xml",
    "application/xml+rss",
    "application/x-font-opentype",
    "application/x-font-truetype",
    "application/x-font-ttf",
    "application/x-httpd-cgi",
    "application/x-javascript",
    "application/x-mpegurl",
    "application/x-opentype",
    "application/x-otf",
    "application/x-perl",
    "application/x-ttf",
    "font/eot",
    "font/ttf",
    "font/otf",
    "font/opentype",
    "image/svg+xml",
    "text/css",
    "text/csv",
    "text/html",
    "text/javascript",
    "text/js",
    "text/plain",
    "text/richtext",
    "text/tab-separated-values",
    "text/xml",
    "text/x-script",
    "text/x-component",
    "text/x-java-source",
  ]
  mime-types = tomap({
    "txt"  = "text/plain",
    "json" = "application/json",
    "pdf"  = "application/pdf",
    "png"  = "image/png",
    "jpeg" = "image/jpeg",
    "jpg"  = "image/jpeg",
    "svg"  = "image/svg+xml",
    "html" = "text/html",
    "ico"  = "image/vnd.microsoft.icon",
    "xls"  = "application/vnd.ms-excel",
    "css"  = "text/css",
    "map"  = "application/octet-stream",
    "js"   = "application/javascript",
  })
}
