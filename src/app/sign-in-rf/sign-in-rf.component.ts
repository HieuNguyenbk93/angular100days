import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from '../validators/no-whitespace.validator';

@Component({
  selector: 'app-sign-in-rf',
  templateUrl: './sign-in-rf.component.html',
  styleUrls: ['./sign-in-rf.component.scss']
})
export class SignInRfComponent implements OnInit {

  // signInForm =  new FormGroup({
  //   username: new FormControl(""),
  //   password: new FormControl(""),
  //   rememberMe: new FormControl(false),
  // });
  //----- FormGroup: use new

  signInForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      username: "",
      password: "",
      rememberMe: false,
    });
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
        username: [
            "",
            Validators.compose([
                //Validators.required,
                NoWhitespaceValidator(),
                Validators.minLength(6),
                Validators.pattern(/^[a-z]{6,32}$/i),
            ]),
        ],
        password: [
            "",
            Validators.compose([
              Validators.required,
              Validators.minLength(6),
              Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
            ]),
        ],
        rememberMe: false,
    })
    // setTimeout(() => {
    //   // fake api call then update form value
    //   this.signInForm.patchValue({
    //     username: 'TiepPhan'
    //   });
    // }, 1000);
  }

  onSubmit() : void {
    console.log(this.signInForm);
  }

}
