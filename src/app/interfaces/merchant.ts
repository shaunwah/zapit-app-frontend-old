import {MerchantStore} from "./merchant-store";
import {User} from "./user";

export interface Merchant {
  id?: number;
  // user: number;
  identifier: string;
  name: string;
  nameAlt?: string;
  merchantStores: MerchantStore[];
  isActive?: boolean;
  isHidden?: boolean;
  createdBy?: User;
  createdOn?: string;
  updatedOn?: string;
}
