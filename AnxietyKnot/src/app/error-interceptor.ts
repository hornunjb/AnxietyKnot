import {HttpInterceptor, HttpRequest, HttpHandler,  HttpErrorResponse} from "@angular/common/http";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";

import {MatDialogModule} from '@angular/material/dialog';
import { catchError } from "rxjs/operators";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialogModule) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
         alert(error.error.message);
          return throwError(error);
          /// LOGIN AND SIGNUP ERROR MESSAGES FETCHED FROM /ROUTES/POSTS.JS AND USER.JS
      })
    );
  }
}
