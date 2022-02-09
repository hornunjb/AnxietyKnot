import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
////import { PostCreateComponent } from './post-create/post-create.component';
//import { PostListComponent } from './post-list/post-list.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { JournalBookComponent } from './journal-book/journal-book.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { ResourceComponent } from './resource/resource.component';
import { TrackerComponent } from './tracker/tracker.component';
//import { EntryComponent } from './entry/entry.component';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuillModule } from 'ngx-quill';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {NgRatingBarModule } from 'ng-rating-bar';
import { PopupComponent } from './popup/popup.component';
import { ChartsComponent } from './charts/charts.component';
import { HomeComponent } from './home/home.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { PromptedEntryComponent } from './prompted-entry/prompted-entry.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {LoginComponent} from "./auth/login/login.component";
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from "./auth/auth-interceptor";
import { HeaderComponent } from './header/header.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from "./error/error.component";
//import { MatPaginatorModule } from "@angular/material/paginator";



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    JournalBookComponent,
    ResourceComponent,
    TrackerComponent,
    PopupComponent,
    ChartsComponent,
    HomeComponent,
    NewEditComponent,
    PromptedEntryComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    ErrorComponent
    //PostCreateComponent,
    //PostListComponent,
      //EntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    FormsModule,
    MatCommonModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    CommonModule,
    NgxChartsModule,
    QuillModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSliderModule,
    MatDialogModule,
    NgRatingBarModule,
    ReactiveFormsModule,
    EditorModule,
    MatCheckboxModule,
    MatSelectModule,
    //MatPaginatorModule,
    MatProgressSpinnerModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],

  entryComponents: [ErrorComponent]
})
export class AppModule { }
