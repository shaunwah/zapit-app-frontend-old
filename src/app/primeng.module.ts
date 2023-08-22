import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { MegaMenuModule } from 'primeng/megamenu';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';

const modules = [
  ButtonModule,
  InputTextModule,
  InputMaskModule,
  MessageModule,
  MessagesModule,
  KeyFilterModule,
  DropdownModule,
  TableModule,
  MenubarModule,
  InputNumberModule,
  ToastModule,
  BreadcrumbModule,
  CardModule,
  TabViewModule,
  ConfirmPopupModule,
  InputTextareaModule,
  FileUploadModule,
  DividerModule,
  MegaMenuModule,
  InputSwitchModule,
  AutoCompleteModule,
];

@NgModule({
  providers: [MessageService],
  imports: modules,
  exports: modules,
})
export class PrimengModule {}
