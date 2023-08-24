import { Merchant } from './merchant';
import { User } from './user';
import {ProductCategory} from "./product-category";

export interface Product {
  id?: number;
  identifier: string;
  name: string;
  merchant: Merchant;
  image?: string;
  productCategory?: ProductCategory;
  description?: string;
  unitPrice: number;
  quantity: number;
  isActive: boolean;
  isHidden?: boolean;
  createdBy?: User;
  createdOn?: string;
  updatedOn?: string;
}
