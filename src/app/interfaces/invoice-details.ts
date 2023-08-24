import {Invoice} from "./invoice";
import {Product} from "./product";
import {User} from "./user";

export interface InvoiceDetails {
  id: number;
  invoice: Invoice;
  product: Product;
  quantity: number;
  taxRate: number;
  isLocked: boolean;
  isHidden: boolean;
  createdBy: User;
  createdOn: string;
  updatedOn: string;
}
