import {Component, Input} from '@angular/core';
import {AbstractControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-p-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent {
  @Input() displayName!: string;
  @Input() name!: string;
  @Input() abstractControl!: AbstractControl<any, any>;
  protected readonly Validators = Validators;
}
