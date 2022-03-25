import { Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../authenticate/auth.service";
import { FormGroup, Validators, FormControl, NgForm} from "@angular/forms"
//--FORM CONTROL AND FORM GROUP CANNOT BE USED WITH NGFORM--//

import { CustomValidators } from '../providers/CustomValidators';
///AUTH CREATE REDIRECTS TO 'auth.service.ts' WHICH CONTAINS HTTPCLIENT



///https://readerstacks.com/password-and-confirm-password-validation-in-angular/


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {


 // success = '';
  submitted = false;
  isLoading = false;
  private authStatusSub: Subscription;

 public signupForm = new FormGroup
  ({
  username: new FormControl ("", [Validators.required]),
 // firstName: new FormControl('', [Validators.required]),
  //lastName: new FormControl('', [Validators.required]),
  email: new FormControl ("", [Validators.required, Validators.email]),
  password: new FormControl ("", [Validators.required, Validators.minLength(8)]),
  confirmPassword: new FormControl ("", [Validators.required])
    },
    /// CustomValidator located in /providers
  CustomValidators.mustMatch('password', 'confirmPassword')
);


constructor(public authService: AuthService){}

  ngOnInit() {
    this.authStatusSub = this.authService.
    getAuthStatusListener()
    .subscribe(_authStatus => {
        this.isLoading = false;
      });
    }

    // convenience getter for easy access to form fields
  //get f() {
 //   return this.signupForm.controls;
 // }

  onSignup(){
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
   // this.success = JSON.stringify(this.signupForm.value);

    this.authService
      .createUser(
        this.signupForm.value.email, this.signupForm.value.password
    )
      }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
