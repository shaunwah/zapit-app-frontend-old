import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  private breadcrumbService = inject(BreadcrumbService);
  items!: MenuItem[];
  home!: MenuItem;

  ngOnInit() {}
}
