import {Merchant} from "./merchant";
import {User} from "./user";

export interface MerchantStore {
  id?: number;
  merchant: Merchant;
  identifier: string;
  name: string;
  address?: string;
  postCode: string;
  website?: string;
  telephone?: string;
  isActive?: boolean;
  isHidden?: boolean;
  createdBy?: User;
  createdOn?: string;
  updatedOn?: string;
}
