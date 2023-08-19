import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements OnInit {
  items!: MenuItem[];

  ngOnInit() {
    this.items = [
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
        ],
      },
      {
        label: 'Account',
        icon: 'pi pi-fw pi-user',
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
