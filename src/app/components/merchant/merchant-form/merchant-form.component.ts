import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../../../services/merchant.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { MerchantUser } from '../../../interfaces/merchant-user';

@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.css'],
})
export class MerchantFormComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private merchantService = inject(MerchantService);
  private messageService = inject(MessageService);
  private userService = inject(UserService);
  readonly merchantId = Number(this.route.snapshot.paramMap.get('merchantId'));
  merchantForm!: FormGroup;
  merchantStoreForm!: FormGroup;
  getMerchantByIdSub?: Subscription;
  createMerchantSub?: Subscription;
  updateMerchantSub?: Subscription;
  getUsersSub?: Subscription;
  users!: User[];
  filteredUsers!: User[];
  merchantUsers!: MerchantUser[];
  componentTitle!: string;
  editMode!: Boolean;

  ngOnInit() {
    if (!this.router.url.endsWith('/edit')) {
      this.editMode = false;
      this.componentTitle = 'New Merchant';
    } else {
      this.editMode = true;
      this.componentTitle = 'Edit Merchant';
      this.getMerchantByIdSub = this.merchantService
        .getMerchantById(this.merchantId)
        .subscribe({
          next: (merchant) => {
            merchant.merchantStores.forEach((_, index) => {
              if (index != 0) {
                this.addMerchantStore();
              }
            });
            this.merchantForm.patchValue({
              ...merchant,
              merchantUsers: this.mapMerchantUsersToUsers(
                merchant.merchantUsers as any,
              ) as User[], // TODO user lazyload
              merchantStores: [...merchant.merchantStores],
            });
            console.log(this.merchantForm.value);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
            });
            this.router.navigate(['/merchants']);
          },
        });
    }

    this.getUsersSub = this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
    });

    this.merchantStoreForm = this.fb.group({
      id: [''],
      identifier: [''], // TODO validation
      name: [''],
      address: [''],
      postCode: [''],
      website: [''],
      telephone: [''],
      isActive: [true],
    });

    this.merchantForm = this.fb.group({
      identifier: ['', [Validators.required]],
      name: ['', [Validators.required]],
      nameAlt: [''],
      website: [''],
      merchantUsers: [[]],
      merchantStores: this.fb.array([this.merchantStoreForm]),
      isActive: [true],
    });
  }

  addMerchantStore() {
    // TODO
    const merchantStoreForm = this.fb.group({
      id: [''],
      identifier: [''],
      name: [''],
      address: [''],
      postCode: [''],
      website: [''],
      telephone: [''],
      isActive: [true],
    });
    this.merchantStores.push(merchantStoreForm);
  }

  removeMerchantStore(index: number) {
    if (index != 0) {
      this.merchantStores.removeAt(index);
    }
  }

  filter(event: any) {
    let filtered: User[] = [];
    let query = event.query;

    for (let i = 0; i < (this.users as User[]).length; i++) {
      let user = (this.users as User[])[i];
      if (user.username.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }
    this.filteredUsers = filtered;
  }

  ngOnDestroy() {
    this.getMerchantByIdSub?.unsubscribe();
    this.createMerchantSub?.unsubscribe();
    this.updateMerchantSub?.unsubscribe();
    this.getUsersSub?.unsubscribe();
  }

  get identifier() {
    return this.merchantForm.get('identifier')!;
  }

  get name() {
    return this.merchantForm.get('name')!;
  }

  get merchantStores() {
    return this.merchantForm.get('merchantStores') as FormArray;
  }

  get nameAlt() {
    return this.merchantForm.get('nameAlt')!;
  }

  get website() {
    return this.merchantForm.get('website')!;
  }

  get isActive() {
    return this.merchantForm.get('isActive')!;
  }

  onSubmit() {
    this.merchantForm.value.merchantUsers = this.mapUserstoMerchantUsers(
      this.merchantForm.value.merchantUsers,
    );
    if (!this.editMode) {
      this.createMerchant();
      return;
    }
    this.updateMerchant();
  }

  private mapUserstoMerchantUsers(users: User[]): MerchantUser[] {
    return users.map((user: User) => {
      return { user } as MerchantUser;
    });
  }

  private mapMerchantUsersToUsers(merchantUsers: MerchantUser[]): User[] {
    return merchantUsers.map((merchantUser: MerchantUser) => {
      return merchantUser.user as User;
    });
  }

  private createMerchant() {
    console.log(this.merchantForm.value); // TODO
    this.getMerchantByIdSub = this.merchantService
      .createMerchant({
        ...this.merchantForm.value,
      })
      .subscribe({
        next: (merchant) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${merchant.name} created`,
          });
          this.router.navigate(['/merchant', merchant.id]);
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

  private updateMerchant() {
    console.log(this.merchantForm.value);
    this.updateMerchantSub = this.merchantService
      .updateMerchant({
        id: this.merchantId,
        ...this.merchantForm.value,
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.merchantForm.value.name} updated`,
          });
          this.router.navigate(['/merchant', this.merchantId]);
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
