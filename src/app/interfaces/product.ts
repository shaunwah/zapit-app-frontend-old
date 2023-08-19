import {Merchant} from "./merchant";
import {User} from "./user";

export interface Product {
  id?: number;
  identifier: string;
  name: string;
  merchant: Merchant;
  // productCategory: ProductCategory;
  image?: string;
  description?: string;
  unitPrice: number;
  isHidden?: boolean;
  createdBy?: User;
  createdOn?: string;
  updatedOn?: string;
}
