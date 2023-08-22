import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { Merchant } from '../../../interfaces/merchant';
import { MerchantService } from '../../../services/merchant.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
})
export class MerchantListComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private merchantService = inject(MerchantService);
  loading: boolean = false;
  merchants: Merchant[] = [];
  selectedMerchant!: Merchant;
  getMerchantCountSub?: Subscription;
  getMerchantsSub?: Subscription;
  totalRecords!: number;

  ngOnInit() {
    // this.getProductCountSub = this.productService
    //   .getProductCount()
    //   .subscribe((value) => (this.totalRecords = value));
  }

  ngOnDestroy() {
    this.getMerchantCountSub?.unsubscribe();
    this.getMerchantsSub?.unsubscribe();
  }

  onRowSelect(event: any) {
    this.router.navigate(['/merchant', event.data.id]);
  }

  onLazyLoad(table: Table, event: any) {
    let page = (event.first + table.rows!) / table.rows! - 1;
    let limit = table.rows;
    let sortColumn = event.sortField;
    let sortDirection = event.sortOrder;

    setTimeout(() => {
      this.getMerchantsSub = this.merchantService
        .getMerchants(null, page, limit, sortColumn, sortDirection)
        .subscribe({
          next: (merchants) => (this.merchants = merchants),
          error: (err) => {}, // TODO message
          complete: () => (this.loading = false),
        });
    });
  }
}
