terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 4.0.0, < 5.0.0"
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
  subscription_id = "6959f7f4-3e99-4b88-9998-eb566736ce71"
  features {}
}
