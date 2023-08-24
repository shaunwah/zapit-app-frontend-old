import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {MerchantService} from "../../../services/merchant.service";
import {MessageService} from "primeng/api";
import {Merchant} from "../../../interfaces/merchant";
import {ProductCategory} from "../../../interfaces/product-category";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private merchantService = inject(MerchantService);
  private messageService = inject(MessageService);
  readonly productId = Number(this.route.snapshot.paramMap.get('productId'));
  merchants!: Merchant[];
  invoiceForm!: FormGroup;
  getMerchantsSub?: Subscription;
  getProductCategoriesSub?: Subscription;
  getProductByIdSub?: Subscription;
  createProductSub?: Subscription;
  updateProductSub?: Subscription;
  componentTitle!: string;
  editMode!: Boolean;
  visible = false;

  ngOnInit() {
    if (!this.router.url.endsWith('/edit')) {
      this.editMode = false;
      this.componentTitle = 'New Invoice';
    } else {
      this.editMode = true;
      this.componentTitle = 'Edit Invoice';
    }
    this.getMerchantsSub = this.merchantService.getMerchants().subscribe({
      next: (merchants) => (this.merchants = merchants),
    });

    this.invoiceForm = this.fb.group({
      id: [''],
      merchant: this.fb.group({
        id: ['', [Validators.required]],
      }),
      user: this.fb.group({
        id: [''],
      }),
      identifier: ['', [Validators.required]],
      invoiceStatus: this.fb.group({
        id: [''],
      }),
      invoiceDetails: this.fb.array([]),
    });
  }

  ngOnDestroy() {
  }


  onSubmit() {
    if (!this.editMode) {
      this.createInvoice();
      return;
    }
    this.updateInvoice();
  }

  private createInvoice() {
    this.createProductSub = this.productService
      .createProduct({
        ...this.invoiceForm.value,
      })
      .subscribe({
        next: (product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${product.name} created`,
          });
          this.router.navigate(['/product', product.id]);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      });
  }

  private updateInvoice() {
    this.updateProductSub = this.productService
      .updateProduct({
        ...this.invoiceForm.value,
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.invoiceForm.value.name} updated`,
          });
          this.router.navigate(['/product', this.productId]);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      });
  }
}
