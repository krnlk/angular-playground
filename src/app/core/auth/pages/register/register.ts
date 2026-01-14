import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'pgd-register',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    TranslatePipe,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  protected get login() {
    return this.registerForm.get('login');
  }

  private formBuilder = inject(FormBuilder);

  protected registerForm: FormGroup = this.formBuilder.group(
    {
      email: [null, [Validators.required, Validators.email]],
      login: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24),
        ],
      ],
      repeatPassword: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required, this.dateOfBirthValidator()]],
    },
    { validators: this.repeatPasswordValidator('password', 'repeatPassword') },
  );

  private repeatPasswordValidator(
    password: string,
    repeatPassword: string,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const repeatingPasswordControl = control.get(repeatPassword);

      const arePasswordsIdentical =
        passwordControl!.value === repeatingPasswordControl!.value;

      if (!arePasswordsIdentical) {
        const error = { passwordMismatch: true };
        repeatingPasswordControl!.setErrors(error);
        return error;
      } else {
        repeatingPasswordControl!.setErrors(null);
        return null;
      }
    };
  }

  private dateOfBirthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isDate = control.value instanceof Date;

      if (isDate) {
        const minDate = new Date('01-01-1900');
        const maxDate = new Date();
        const isValidDate =
          minDate <= control.value && maxDate >= control.value;

        return isValidDate ? null : { dateOfBirth: { value: control.value } };
      }

      return null;
    };
  }

  protected onSubmit(): void {
    if (this.registerForm.valid) {
      alert('Registered succesfully!');
    }
  }
}
