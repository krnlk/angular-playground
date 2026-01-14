import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'pgd-login',
  imports: [
    MatInputModule,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardActions,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    TranslatePipe,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private formBuilder = inject(FormBuilder);

  protected loginForm = this.formBuilder.group({
    login: [null, Validators.required],
    password: [null, Validators.required],
  });

  protected loginToAccount(): void {
    console.log(this.loginForm.get('login')?.getError('invalid'));
    console.log(this.loginForm.get('password')?.getError('invalid'));

    if (this.loginForm.valid) {
      const loginHTTPRequest = {
        login: this.loginForm.controls['login'].value,
        password: this.loginForm.controls['password'].value,
      };
      console.log(loginHTTPRequest);
      // TODO send HTTP request

      // temp
      if (
        loginHTTPRequest.login === 'test' &&
        loginHTTPRequest.password === 'test'
      ) {
        alert('Login succesful!');
      } else {
        const error = { invalid: true };
        this.loginForm.setErrors(error);
      }
    }

    return;
  }
}
