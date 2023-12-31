import {Component, inject, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements OnInit {
  authService = inject(AuthService);
  username?: string;
  items!: MenuItem[];

  ngOnInit() {
    this.username = this.authService.getUsernameInStorage()!;

    this.items = [
      {
        label: 'Merchants',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'View',
            icon: 'pi pi-fw pi-list',
            routerLink: '/merchants',
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/merchant/new',
          },
        ],
      },
      {
        label: 'Products',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'View',
            icon: 'pi pi-fw pi-list',
            routerLink: '/products',
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/product/new',
          },
          {
            separator: true,
          },
          {
            label: 'Categories',
            icon: 'pi pi-fw pi-box'
          },
          {
            label: 'View',
            icon: 'pi pi-fw pi-list',
            routerLink: '/product-categories',
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/product-category/new',
          },
        ],
      },
      {
        label: 'Invoices',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'View',
            icon: 'pi pi-fw pi-list',
            routerLink: '/invoices',
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/invoice/new',
          },
        ],
      },
      {
        label: 'Transactions',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'View',
            icon: 'pi pi-fw pi-list',
            routerLink: '/transactions',
          },
        ],
      },
      {
        label: this.username ?? 'Account',
        icon: 'pi pi-fw pi-user',
        style: { 'margin-left': 'auto' },
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            routerLink: '/logout',
          },
        ],
      },
    ];
  }
}
