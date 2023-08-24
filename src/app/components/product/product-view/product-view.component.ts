import { Component, inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../interfaces/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  DatePipe,
  formatCurrency,
  formatDate,
  formatNumber,
} from '@angular/common';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  providers: [ConfirmationService],
})
export class ProductViewComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  readonly productId = Number(this.route.snapshot.paramMap.get('productId'));
  getProductByIdSub?: Subscription;
  deleteProductSub?: Subscription;
  product!: Product;
  productDl!: any;
  merchantDl!: any;

  ngOnInit() {
    const LOCALE = 'en-US';
    this.getProductByIdSub = this.productService
      .getProductById(this.productId)
      .subscribe({
        next: (product) => {
          this.product = product;
          this.productDl = {
            items: [
              { name: 'Image', value: product.image },
              { name: 'Identifier', value: product.identifier },
              { name: 'Category', value: product.productCategory!.name },
              { name: 'Description', value: product.description },
              { name: 'Unit Price', value: formatCurrency(product.unitPrice, LOCALE, '$') },
              { name: 'Quantity', value: formatNumber(product.quantity, LOCALE) },
              { name: 'Active', value: product.isActive },
              { name: 'Created by', value: product.createdBy!.username },
              { name: 'Created on', value: formatDate(product.createdOn!, 'medium', LOCALE) },
              { name: 'Updated on', value: formatDate(product.updatedOn!, 'medium', LOCALE) },
            ],
          };
          this.merchantDl = {
            items: [
              { name: 'Name', value: product.merchant.name, routerLink: ['/merchant', product.merchant.id] },
              { name: 'Identifier', value: product.merchant!.identifier },
            ],
          };
        },
      });
  }

  ngOnDestroy() {
    this.getProductByIdSub?.unsubscribe();
    this.deleteProductSub?.unsubscribe();
  }

  confirmDelete(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this product?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProduct();
      },
    });
  }

  deleteProduct() {
    this.deleteProductSub = this.productService
      .deleteProduct(this.productId)
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product deleted',
          });
          this.router.navigate(['/products']);
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
