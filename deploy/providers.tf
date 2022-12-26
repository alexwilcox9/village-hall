terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.34.0, < 4.0.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "wvh-web"
    storage_account_name = "wvhweb"
    container_name       = "tfstate"
    key                  = "wvh-web.asc.tfstate"
  }

}

provider "azurerm" {
  features {}
}
