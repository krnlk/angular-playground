import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { FormGroupTemplate } from '../../../../shared/form-group-template/form-group-template';
import { Auth } from '../../services/auth';

@Component({
  selector: 'pgd-login',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    TranslatePipe,
    FormGroupTemplate,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private formBuilder = inject(FormBuilder);

  private authService = inject(Auth);

  protected loginForm = this.formBuilder.group({
    login: [null, Validators.required],
    password: [null, Validators.required],
  });

  protected loginToAccount(): void {
    if (this.loginForm.valid) {
      const loginHTTPRequest = {
        login: this.loginForm.controls['login'].value,
        password: this.loginForm.controls['password'].value,
      };
      this.authService.loginUser().subscribe((result) => console.log(result));

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
