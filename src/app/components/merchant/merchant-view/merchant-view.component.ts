import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MerchantService } from '../../../services/merchant.service';
import { Merchant } from '../../../interfaces/merchant';
import { formatDate } from '@angular/common';
import { MapboxService } from '../../../services/mapbox.service';
import { Constants } from '../../../utilities/constants';
import { Utilities } from '../../../utilities/utilities';

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
  private mapboxService = inject(MapboxService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  readonly merchantId = Number(this.route.snapshot.paramMap.get('merchantId'));
  getMerchantByIdSub?: Subscription;
  deleteMerchantSub?: Subscription;
  merchant!: Merchant;
  merchantDl!: any;
  merchantStoreDl!: any;
  mapboxMapCoords!: [number, number];

  ngOnInit() {
    const LOCALE = 'en-US';
    this.getMerchantByIdSub = this.merchantService
      .getMerchantById(this.merchantId)
      .subscribe({
        next: (merchant) => {
          this.merchant = merchant;
          this.merchantDl = {
            items: [
              { name: 'Identifier', value: merchant.identifier },
              {
                name: 'Website',
                value: merchant.website,
                link: merchant.website,
              },
              { name: 'Active', value: merchant.isActive },
              { name: 'Created by', value: merchant.createdBy?.username },
              {
                name: 'Created on',
                value: formatDate(merchant.createdOn!, 'medium', LOCALE),
              },
              {
                name: 'Updated on',
                value: formatDate(merchant.updatedOn!, 'medium', LOCALE),
              },
            ],
          };
          this.merchantStoreDl = merchant.merchantStores.map(
            (merchantStore) => {
              return {
                title: merchantStore.name,
                items: [
                  { name: 'Identifier', value: merchantStore.identifier },
                  {
                    name: 'Website',
                    value: merchantStore.website,
                    link: merchantStore.website,
                  },
                  { name: 'Telephone', value: merchantStore.telephone },
                  { name: 'Address', value: merchantStore.address },
                  { name: 'Postal Code', value: merchantStore.postCode },
                  { name: 'Active', value: merchantStore.isActive },
                  {
                    name: 'Created by',
                    value: merchantStore.createdBy?.username,
                  },
                  {
                    name: 'Created on',
                    value: formatDate(
                      merchantStore.createdOn!,
                      'medium',
                      LOCALE,
                    ),
                  },
                  {
                    name: 'Updated on',
                    value: formatDate(
                      merchantStore.updatedOn!,
                      'medium',
                      LOCALE,
                    ),
                  },
                ],
              };
            },
          );
          // this.mapboxService.forwardGeocode(merchant.merchantStores[0].address!, merchant.merchantStores[0].postCode!)
          //   .subscribe(data => this.mapboxMapCoords = (data as any).features[0].center);
        },
        error: (err) =>
          this.messageService.add(Utilities.customToastErrorMessage(err)),
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
        next: () => {
          this.router
            .navigate(['/merchants'])
            .then(() =>
              this.messageService.add(
                Utilities.customToastSuccessMessage('Merchant deleted'),
              ),
            );
        },
        error: (err) =>
          this.messageService.add(Utilities.customToastErrorMessage(err)),
      });
  }
}
