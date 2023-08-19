export interface User {
  id?: number;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  mobilePhone?: string;
  roles: string;
  isMerchant?: boolean;
  isActive?: boolean;
  isHidden?: boolean;
  createdBy?: User;
  createdOn?: string;
  updatedOn?: string;
}
