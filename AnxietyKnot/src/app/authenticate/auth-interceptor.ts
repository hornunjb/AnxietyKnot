import {HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

/// INTERCEPT ALL OUTGOING HTTP REQUESTS
/// MANIPULATES OUTGOING REQS TO ATTACH OUR JWT
/// ACTS AS MIDDLEWARE FOR OUTGOING REQUESTS

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({

      /// "Bearer" can be omitted
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
