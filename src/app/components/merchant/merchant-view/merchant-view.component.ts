import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MerchantService } from '../../../services/merchant.service';
import { Merchant } from '../../../interfaces/merchant';

@Component({
  selector: 'app-merchant-view',
  templateUrl: './merchant-view.component.html',
  styleUrls: ['./merchant-view.component.css'],
  providers: [ConfirmationService],
})
export class MerchantViewComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private merchantService = inject(MerchantService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  readonly merchantId = Number(this.route.snapshot.paramMap.get('merchantId'));
  getMerchantByIdSub?: Subscription;
  deleteMerchantSub?: Subscription;
  merchant!: Merchant;

  ngOnInit() {
    this.getMerchantByIdSub = this.merchantService
      .getMerchantById(this.merchantId)
      .subscribe({
        next: (merchant) => (this.merchant = merchant),
      });
  }

  ngOnDestroy() {
    this.getMerchantByIdSub?.unsubscribe();
    this.deleteMerchantSub?.unsubscribe();
  }

  confirmDelete(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this merchant?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteMerchant();
      },
    });
  }

  deleteMerchant() {
    this.deleteMerchantSub = this.merchantService
      .deleteMerchant(this.merchantId)
      .subscribe({
        next: (_) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Merchant deleted',
          });
          this.router.navigate(['/merchants']);
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

  protected readonly localStorage = localStorage;
}
