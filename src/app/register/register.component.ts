import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private _api: ApiService) {
    this.registerForm = this.fb.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
        this.validateUserNameFormAPIDebounce.bind(this),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      ],
      confirmPassword: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      ],
    },
    {
      validators: this.validateControlsValue("password", "confirmPassword")
    }
    );
  }

  ngOnInit(): void {
  }

  submitForm() : void {
    console.log('Submit');

    this.validateControlsValue('abd','def');
  }

  validateUserNameFromAPI(control: AbstractControl): Observable<ValidationErrors | null> {
    return this._api.validateUserName(control.value).pipe(
      map(isValid => {
        if (isValid) {
          return null;
        }
        return {
          "usernameDuplicated": true
        }
      })
    );
  }

  validateUserNameFormAPIDebounce(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() =>
        this._api.validateUserName(control.value).pipe(
          map(isValid => {
            if (isValid) {
              return null;
            }
            return {
              "usernameDuplicated": true
            }
          })
        )
      )
    );
  }

  validateControlsValue(firstControlName: string, secondControlName: string) {

    return function(formGroup: FormGroup) {
      const { value: firstControlValue } = formGroup.get(firstControlName) as FormControl;
      const { value: secondControlValue } = formGroup.get(secondControlName) as FormControl;
      return firstControlValue === secondControlValue
        ? null
        : {
          valueNoMatch: {
            firstControlValue,
            secondControlValue,
          }
        };
    };
  }

}
