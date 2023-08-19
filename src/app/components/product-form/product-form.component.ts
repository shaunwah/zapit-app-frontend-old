import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Observable, Subscription} from "rxjs";
import {MerchantService} from "../../services/merchant.service";
import {Merchant} from "../../interfaces/merchant";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private merchantService = inject(MerchantService);
  private messageService = inject(MessageService);
  readonly productId = Number(this.route.snapshot.paramMap.get('productId'));
  productForm!: FormGroup;
  getProductByIdSub?: Subscription;
  createProductSub?: Subscription;
  updateProductSub?: Subscription;
  merchants$!: Observable<Merchant[]>;
  componentTitle!: string;
  editMode!: Boolean;

  ngOnInit() {
    if (!this.router.url.endsWith('/edit')) {
      this.editMode = false;
      this.componentTitle = 'New Product'
    } else {
      this.editMode = true;
      this.componentTitle = 'Edit Product'
      this.productService.getProductById(this.productId)
        .subscribe({
          next: product => this.productForm.patchValue(product),
          error: err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message })
            this.router.navigate(['/products']);
          }
        })
    }
    this.merchants$ = this.merchantService.getMerchants();

    this.productForm = this.fb.group({
      merchant: this.fb.group({
        id: ['', [Validators.required]]
      }),
      identifier: ['', [Validators.required]],
      name: ['', [Validators.required]],
      // category: this.fb.group({
      //   id: ['', [Validators.required]]
      // }),
      image: [''],
      description: [''],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnDestroy() {
    this.getProductByIdSub?.unsubscribe()
    this.createProductSub?.unsubscribe();
    this.updateProductSub?.unsubscribe();
  }

  get merchantId() { return this.productForm.get('merchant')!.get('id')!; }
  get identifier() { return this.productForm.get('identifier')!; }
  get name() { return this.productForm.get('name')!; }
  get image() { return this.productForm.get('image')!; }
  get description() { return this.productForm.get('description')!; }
  get unitPrice() { return this.productForm.get('unitPrice')!; }

  onSubmit() {
    if (!this.editMode) {
      this.createProduct();
      return;
    }
    this.updateProduct();
  }

  private createProduct() {
    this.createProductSub = this.productService.createProduct({ //validate if merchant is user
      ...this.productForm.value
    }).subscribe({
      next: product => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${product.name} created` });
        this.router.navigate(['/product', product.id]);
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    })
  }

  private updateProduct() {
    this.updateProductSub = this.productService.updateProduct({ //validate if merchant is user
      id: this.productId,
      ...this.productForm.value
    }).subscribe({
      next: _ => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${this.productForm.value.name} updated` });
        this.router.navigate(['/product', this.productId]);
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    })
  }
}
