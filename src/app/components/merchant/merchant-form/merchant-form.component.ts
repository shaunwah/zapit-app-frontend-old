import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../../../services/merchant.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { MerchantUser } from '../../../interfaces/merchant-user';
import {Constants} from "../../../utilities/constants";
import {Utilities} from "../../../utilities/utilities";

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
  readonly validatorPatternUrl = Validators.pattern('[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)');
  merchantForm!: FormGroup;
  merchantStoreForm!: FormGroup;
  readonly merchantStoreFormTemplate = {
    id: [''],
    identifier: ['', [Validators.required]],
    name: ['', [Validators.required]],
    address: [''],
    postCode: [''],
    website: ['', [this.validatorPatternUrl]],
    telephone: [''],
    isActive: [true],
  };
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
            merchant.merchantStores.forEach((_, i) => {
              if (i != 0) {
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
          },
          error: (err) =>
            this.router.navigate(['/merchants'])
              .then(() => this.messageService.add(Constants.TOAST_ERROR))
        });
    }

    this.getUsersSub = this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
    });

    this.merchantStoreForm = this.fb.group(this.merchantStoreFormTemplate);

    this.merchantForm = this.fb.group({
      id: [''],
      identifier: ['', [Validators.required]],
      name: ['', [Validators.required]],
      nameAlt: [''],
      website: ['', [this.validatorPatternUrl]],
      merchantUsers: [[]],
      merchantStores: this.fb.array([this.merchantStoreForm]),
      isActive: [true],
    });
  }

  addMerchantStore() {
    this.merchantStores.push(this.fb.group(this.merchantStoreFormTemplate));
  }

  removeMerchantStore(index: number) {
    if (index != 0) {
      this.merchantStores.removeAt(index);
      this.merchantForm.markAsDirty();
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
    this.getMerchantByIdSub = this.merchantService
      .createMerchant(this.merchantForm.value)
      .subscribe({
        next: (merchant) =>
          this.router.navigate(['/merchant', merchant.id])
            .then(() => this.messageService.add(Utilities.customToastSuccessMessage(`${merchant.name} created`))),
        error: (err) => this.messageService.add(Utilities.customToastErrorMessage(err))
      });
  }

  private updateMerchant() {
    this.updateMerchantSub = this.merchantService
      .updateMerchant(this.merchantForm.value)
      .subscribe({
        next: () =>
          this.router.navigate(['/merchant', this.merchantId])
            .then(() => this.messageService.add(Utilities.customToastSuccessMessage(`${this.merchantForm.value.name} updated`))),
        error: (err) => {
          this.messageService.add(Utilities.customToastErrorMessage(err));
        },
      });
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
  get website() {
    return this.merchantForm.get('website')!;
  }
  get isActive() {
    return this.merchantForm.get('isActive')!;
  }
}
