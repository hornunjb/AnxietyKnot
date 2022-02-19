import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      _authStatus => {
        this.isLoading = false;
      }
    );
  }

  //outputs values entered by user in browser console
onSignup(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    /// sends email and password values to server
    this.authService.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
