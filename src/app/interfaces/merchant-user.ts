import {User} from "./user";
import {Merchant} from "./merchant";

export interface MerchantUser {
  id?: number;
  merchant: Merchant;
  user: User;
  roles?: string;
  isHidden?: boolean;
  createdBy?: User;
  createdOn?: string;
  updatedOn?: string;
}
