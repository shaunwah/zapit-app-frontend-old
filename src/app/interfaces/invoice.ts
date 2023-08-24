import {Merchant} from "./merchant";
import {User} from "./user";
import {InvoiceStatus} from "./invoice-status";
import {InvoiceDetails} from "./invoice-details";

export interface Invoice {
  id: number;
  identifier: string;
  merchant: Merchant;
  user: User;
  invoiceStatus: InvoiceStatus;
  invoiceDetails: InvoiceDetails[];
  isLocked: boolean;
  isHidden: boolean;
  createdBy: User;
  createdOn: string;
  updatedOn: string;
}
