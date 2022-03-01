import { Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../authenticate/auth.service";
import { FormGroup, Validators, FormControl} from "@angular/forms"


///AUTH CREATE REDIRECTS TO 'auth.service.ts' WHICH CONTAINS HTTPCLIENT

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

public signupForm = new FormGroup (
  {
  username: new FormControl ("", Validators.required),
  email: new FormControl ("", Validators.required),
  password: new FormControl ("", Validators.required),
  repassword: new FormControl ("", Validators.required),
});

constructor(public authService: AuthService){}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      _authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignup(){
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password);
  }



  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
