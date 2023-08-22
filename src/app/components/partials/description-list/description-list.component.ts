import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-description-list',
  templateUrl: './description-list.component.html',
  styleUrls: ['./description-list.component.css']
})
export class DescriptionListComponent {
  @Input() items!: { name: string, value: any }[];
}
