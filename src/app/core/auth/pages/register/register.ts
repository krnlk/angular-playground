import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { FormGroupTemplate } from '../../../../shared/form-group-template/form-group-template';
import { Auth } from '../../services/auth';
import {
  dateOfBirthValidator,
  repeatPasswordValidator,
} from '../../utils/register.utils';
import { UserRequest } from '../models/user-request';

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
    FormGroupTemplate,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private formBuilder = inject(FormBuilder);

  private authService = inject(Auth);

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
      dateOfBirth: [null, [Validators.required, dateOfBirthValidator()]],
    },
    { validators: repeatPasswordValidator('password', 'repeatPassword') },
  );

  protected onSubmit(): void {
    if (this.registerForm.valid) {
      const userRequest: UserRequest = {
        email: this.registerForm.controls['email'].value,
        login: this.registerForm.controls['login'].value,
        password: this.registerForm.controls['password'].value,
        dateOfBirth: this.registerForm.controls['dateOfBirth'].value,
      };

      console.log(userRequest);

      this.authService.registerUser(userRequest).subscribe((result) => {
        console.log(result);
        alert('Registered succesfully!');
      });
    }
  }
}
