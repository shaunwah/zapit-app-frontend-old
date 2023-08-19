import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  deleteProductSub?: Subscription;
  product$!: Observable<Product>;

  ngOnInit() {
    this.product$ = this.productService.getProductById(this.productId);
  }

  ngOnDestroy() {
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
