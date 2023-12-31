import { MerchantStore } from './merchant-store';
import { User } from './user';

export interface Merchant {
  id?: number;
  identifier: string;
  name: string;
  nameAlt?: string;
  website?: string;
  merchantUsers: User[];
  merchantStores: MerchantStore[];
  isActive?: boolean;
  isHidden?: boolean;
  createdBy?: User;
  createdOn?: string;
  updatedOn?: string;
}
