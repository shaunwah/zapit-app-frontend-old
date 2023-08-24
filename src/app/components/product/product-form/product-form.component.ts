import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { MerchantService } from '../../../services/merchant.service';
import { Merchant } from '../../../interfaces/merchant';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../../../interfaces/product-category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private merchantService = inject(MerchantService);
  private messageService = inject(MessageService);
  readonly productId = Number(this.route.snapshot.paramMap.get('productId'));
  merchants!: Merchant[];
  productCategories!: ProductCategory[];
  productForm!: FormGroup;
  getMerchantsSub?: Subscription;
  getProductCategoriesSub?: Subscription;
  getProductByIdSub?: Subscription;
  createProductSub?: Subscription;
  updateProductSub?: Subscription;
  componentTitle!: string;
  editMode!: Boolean;
  visible = false;

  submitProductCategoryForm(productCategory: ProductCategory) {
    // TODO refresh dropdown
    this.productCategories.push(productCategory);
    this.visible = false;
  }

  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    if (!this.router.url.endsWith('/edit')) {
      this.editMode = false;
      this.componentTitle = 'New Product';
    } else {
      this.editMode = true;
      this.componentTitle = 'Edit Product';
      this.getProductByIdSub = this.productService
        .getProductById(this.productId)
        .subscribe({
          next: (product) => {
            this.productForm.patchValue(product);
            this.getProductCategories(product.merchant.id!); // TODO
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

    this.productForm = this.fb.group({
      id: [''],
      merchant: this.fb.group({
        id: ['', [Validators.required]],
      }),
      identifier: ['', [Validators.required]],
      name: ['', [Validators.required]],
      image: [''],
      productCategory: this.fb.group({
        id: [{ value: '', disabled: true }, [Validators.required]],
      }),
      description: [''],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      isActive: [true, [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.getProductByIdSub?.unsubscribe();
    this.createProductSub?.unsubscribe();
    this.updateProductSub?.unsubscribe();
  }

  getProductCategories(merchantId: number) {
    this.getProductCategoriesSub = this.productService
      .getProductCategoriesByMerchantId(merchantId)
      .subscribe({
        next: (productCategories) => {
          this.productCategories = productCategories;
          this.productCategoryId.enable();
        },
      });
  }

  get merchantId() {
    return this.productForm.get('merchant.id')!;
  }

  get identifier() {
    return this.productForm.get('identifier')!;
  }

  get name() {
    return this.productForm.get('name')!;
  }

  get image() {
    return this.productForm.get('image')!;
  }

  get productCategoryId() {
    return this.productForm.get('productCategory.id')!;
  }

  get description() {
    return this.productForm.get('description')!;
  }

  get unitPrice() {
    return this.productForm.get('unitPrice')!;
  }

  get quantity() {
    return this.productForm.get('quantity')!;
  }

  get isActive() {
    return this.productForm.get('isActive')!;
  }

  onUpload(event: any) {
    console.log('uploaded');
  }

  onSubmit() {
    if (!this.editMode) {
      this.createProduct();
      return;
    }
    this.updateProduct();
  }

  private createProduct() {
    this.createProductSub = this.productService
      .createProduct({
        ...this.productForm.value,
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

  private updateProduct() {
    this.updateProductSub = this.productService
      .updateProduct({
        ...this.productForm.value,
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.productForm.value.name} updated`,
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
