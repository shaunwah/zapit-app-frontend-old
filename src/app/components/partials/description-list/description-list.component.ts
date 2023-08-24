import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-p-description-list',
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.css'],
})
export class DescriptionListComponent {
  @Input() data!: { title?: string, items: { name: string; value: any; link?: string, routerLink?: [] }[] };
}
