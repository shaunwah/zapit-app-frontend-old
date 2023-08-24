import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { ProductCategory } from '../../../interfaces/product-category';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css'],
})
export class ProductCategoryListComponent {
  private router = inject(Router);
  private productService = inject(ProductService);
  loading: boolean = false;
  productCategories: ProductCategory[] = [];
  selectedProductCategory!: ProductCategory;
  getProductCategoryCountSub?: Subscription;
  getProductCategoriesSub?: Subscription;
  totalRecords!: number;

  // ngOnInit() {
  //   this.getProductCountSub = this.productService
  //       .getProductCount()
  //       .subscribe((value) => (this.totalRecords = value));
  // }

  ngOnDestroy() {
    this.getProductCategoryCountSub?.unsubscribe();
    this.getProductCategoriesSub?.unsubscribe();
  }

  onRowSelect(event: any) {
    this.router.navigate(['/product-category', event.data.id, 'edit']);
  }

  onLazyLoad(table: Table, event: any) {
    let page = (event.first + table.rows!) / table.rows! - 1;
    let limit = table.rows;
    let sortColumn = event.sortField;
    let sortDirection = event.sortOrder;

    setTimeout(() => {
      this.getProductCategoriesSub = this.productService
        .getProductCategories(page, limit, sortColumn, sortDirection)
        .subscribe({
          next: (productCategories) =>
            (this.productCategories = productCategories),
          error: (err) => {}, // TODO message
          complete: () => (this.loading = false),
        });
    });
  }
}
