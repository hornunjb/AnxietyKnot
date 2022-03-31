import { Component, OnDestroy, OnInit} from "@angular/core";
import { FormGroup, Validators, FormControl} from "@angular/forms"
import { Subscription } from "rxjs";
import { AuthService } from "../authenticate/auth.service";

///AUTH LOGIN REDIRECTS TO 'auth.service.ts' WHICH CONTAINS HTTPCLIENT


import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;


  public loginForm = new FormGroup(
    {
      email: new FormControl("",[ Validators.required]),
      password: new FormControl("", [Validators.required]),
      // remember: new FormControl ("", [Validators.optional])
    }
  );

  constructor(public authService: AuthService){}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      _authStatus => {
        this.isLoading = false;
      }
    );
  }

  onLogin(){
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }



  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}


