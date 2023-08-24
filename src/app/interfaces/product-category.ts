import {Merchant} from "./merchant";
import {User} from "./user";

export interface ProductCategory {
  id: number;
  name: string;
  colour: string;
  merchant: Merchant;
  isHidden: boolean;
  createdBy: User;
  createdOn: string;
  updatedOn: string;
}
