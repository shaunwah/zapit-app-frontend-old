import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../interfaces/product';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private productService = inject(ProductService);
  loading: boolean = false;
  products: Product[] = [];
  selectedProduct!: Product;
  getProductCountSub?: Subscription;
  getProductsSub?: Subscription;
  totalRecords!: number;

  ngOnInit() {
    this.getProductCountSub = this.productService
      .getProductCount()
      .subscribe((value) => (this.totalRecords = value));
  }

  ngOnDestroy() {
    this.getProductCountSub?.unsubscribe();
    this.getProductsSub?.unsubscribe();
  }

  onRowSelect(event: any) {
    this.router.navigate(['/product', event.data.id]);
  }

  onLazyLoad(table: Table, event: any) {
    let page = (event.first + table.rows!) / table.rows! - 1;
    let limit = table.rows;
    let sortColumn = event.sortField;
    let sortDirection = event.sortOrder;

    setTimeout(() => {
      this.getProductsSub = this.productService
        .getProducts(null, page, limit, sortColumn, sortDirection)
        .subscribe({
          next: (products) => (this.products = products),
          error: (err) => {}, // TODO message
          complete: () => (this.loading = false),
        });
    });
  }
}
