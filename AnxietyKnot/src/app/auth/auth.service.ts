
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";


// INJECTS TOKEN INTO ANY SERVICE
@Injectable({ providedIn: "root" })
export class AuthService {
  /// ISAUTHENTICATED = FALSE IF NO TOKEN, TRUE IF THERE IS TOKEN
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
  return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    return this.http
    // .post("http://nodejsangular-env.eba-3fswygyg.us-east-2.elasticbeanstalk.com/api/user/signup", authData)
     .post("http://localhost:3000/api/user/signup", authData)
     .subscribe(response => {
        console.log(response);
        this.router.navigate(["/home"]);
      }, _error => {
        this.authStatusListener.next(false);
      });
  }

  //Authenticate login
  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password,};
    this.http
    //.post<{token: string;  expiresIn: number, userId: string }>("http://nodejsangular-env.eba-3fswygyg.us-east-2.elasticbeanstalk.com/api/user/login", authData)
    .post<{token: string,  expiresIn: number, userId: string }>(
      "http://localhost:3000/api/user/login", authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date (now.getTime() + expiresInDuration * 1000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(["/home"]);

        /// WILL DISPLAY TOKEN IN CONSOLE UPON LOGIN
            //console.log(token);
        }
      }, _error => {
        this.authStatusListener.next(false);
      });
  }

  /// AUTO AUTHENTICATE THE USER VIA LOCAL STORAGE TOKEN to keep USER TOKEN IN USE DURING RELOAD
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  /// TOKEN IS CLEARED FROM LOCAL STORAGE ON LOGOUT
logout() {
  this.token = null;
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  this.userId = null;
  clearTimeout(this.tokenTimer);
  this.clearAuthData(); // USER TOKEN CLEARED ON LOGOUT
  this.router.navigate(['/home']);
}

/// SET TIMEOUT FOR TOKEND AFTER BEING LOGGED ON FOR 1 HOUR
private setAuthTimer(duration: number) {
  console.log("Setting timer: " + duration);
  this.tokenTimer = setTimeout(() => {
    this.logout();
  }, duration * 1000);
}

////// SAVE TOKEN TO LOCAL STORAGE (BROWSER), KEY AND VALUES DISPLAYED BELOW
private saveAuthData(token: string, expirationDate: Date, userId: string) {
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expirationDate.toISOString());
  localStorage.setItem("userId", userId);
}

/// REMOVE TOKEN FROM LOCAL STORAGE (BROWSER) ONCE A USER LOGS-OUT
private clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userId");
}

private getAuthData() {
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration");
  const userId = localStorage.getItem("userId");
  if (!token || !expirationDate) {}
  return {
    token: token,
    expirationDate: new Date(expirationDate),
    userId: userId
    }
  }
}
