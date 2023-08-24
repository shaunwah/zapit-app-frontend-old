import {
  AfterContentChecked,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MerchantService } from '../../../services/merchant.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Merchant } from '../../../interfaces/merchant';
import { ProductCategory } from '../../../interfaces/product-category';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css'],
  providers: [ConfirmationService],
})
export class ProductCategoryFormComponent
  implements OnInit, OnDestroy, AfterContentChecked
{
  @Input() standaloneMode = true;
  @Input() selectedMerchant?: Merchant;
  @Output() submitForm = new EventEmitter<ProductCategory>();
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private merchantService = inject(MerchantService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  readonly productCategoryId = Number(
    this.route.snapshot.paramMap.get('productCategoryId'),
  );
  merchants!: Merchant[];
  productCategoryForm!: FormGroup;
  getMerchantsSub?: Subscription;
  getProductCategoryByIdSub?: Subscription;
  createProductCategorySub?: Subscription;
  updateProductCategorySub?: Subscription;
  deleteProductCategorySub?: Subscription;
  componentTitle!: string;
  editMode!: Boolean;

  ngAfterContentChecked() {
    if (!this.standaloneMode) {
      this.productCategoryForm.patchValue({
        merchant: { id: this.selectedMerchant },
      });
    }
  }

  ngOnInit() {
    if (
      !(
        this.router.url.startsWith('/product-category') &&
        this.router.url.endsWith('/edit')
      )
    ) {
      this.editMode = false;
      this.componentTitle = 'New Product Category';
    } else {
      this.editMode = true;
      this.componentTitle = 'Edit Product Category';
      this.getProductCategoryByIdSub = this.productService
        .getProductCategoryById(this.productCategoryId)
        .subscribe({
          next: (product) => {
            this.productCategoryForm.patchValue(product);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
            });
            this.router.navigate(['/products']);
          },
        });
    }
    this.getMerchantsSub = this.merchantService.getMerchants().subscribe({
      next: (merchants) => (this.merchants = merchants),
    });

    this.productCategoryForm = this.fb.group({
      id: [''],
      merchant: this.fb.group({
        id: [
          { value: '', disabled: !this.standaloneMode },
          [Validators.required],
        ],
      }),
      name: ['', [Validators.required]],
      colour: ['#aaaaaa', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.getProductCategoryByIdSub?.unsubscribe();
    this.createProductCategorySub?.unsubscribe();
    this.updateProductCategorySub?.unsubscribe();
    this.deleteProductCategorySub?.unsubscribe();
  }

  get merchantId() {
    return this.productCategoryForm.get('merchant.id')!;
  }

  get name() {
    return this.productCategoryForm.get('name')!;
  }

  get colour() {
    return this.productCategoryForm.get('colour')!;
  }

  onSubmit() {
    if (!this.editMode) {
      this.createProductCategory();
      return;
    }
    this.updateProductCategory();
  }

  private createProductCategory() {
    console.log(this.selectedMerchant);
    if (this.standaloneMode) {
      this.selectedMerchant = this.merchantId.value;
    }
    this.createProductCategorySub = this.productService
      .createProductCategory({
        ...this.productCategoryForm.value,
        merchant: { id: this.selectedMerchant },
      })
      .subscribe({
        next: (productCategory) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${productCategory.name} created`,
          });
          this.submitForm.emit(productCategory);
          if (this.standaloneMode) {
            this.router.navigate(['/product-categories']);
          }
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

  private updateProductCategory() {
    if (this.standaloneMode) {
      this.selectedMerchant = this.merchantId.value;
    }
    this.updateProductCategorySub = this.productService
      .updateProductCategory({
        ...this.productCategoryForm.value,
        merchant: { id: this.selectedMerchant },
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.productCategoryForm.value.name} updated`,
          });
          if (this.standaloneMode) {
            this.router.navigate(['/product-categories']);
          }
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

  confirmDelete(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this product category?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProduct();
      },
    });
  }

  deleteProduct() {
    this.deleteProductCategorySub = this.productService
      .deleteProductCategory(this.productCategoryId)
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product category deleted',
          });
          this.router.navigate(['/product-categories']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please try again later',
          });
        },
      });
  }
}
