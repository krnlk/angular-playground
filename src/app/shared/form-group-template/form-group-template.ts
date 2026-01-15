import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'pgd-form-group-template',
  imports: [ReactiveFormsModule, MatCardModule, TranslatePipe],
  templateUrl: './form-group-template.html',
  styleUrl: './form-group-template.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupTemplate {
  formGroup = input.required<FormGroup>();

  title = input<string>();

  submit = input<string>();

  submitClicked = output();

  protected onSubmit(): void {
    this.submitClicked.emit();
  }
}
