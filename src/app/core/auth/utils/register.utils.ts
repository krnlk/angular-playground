import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function repeatPasswordValidator(
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

export function dateOfBirthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isDate = control.value instanceof Date;

    if (isDate) {
      const minDate = new Date('01-01-1900'); // no one born before this date is likely to register
      const maxDate = new Date();
      const isValidDate = minDate <= control.value && maxDate >= control.value;

      return isValidDate ? null : { dateOfBirth: { value: control.value } };
    }

    return null;
  };
}
