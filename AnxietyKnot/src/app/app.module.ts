import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCommonModule } from '@angular/material/core';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
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
import { EntryComponent } from './entry/entry.component';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuillModule } from 'ngx-quill';
import { NewEditComponent } from './new-edit/new-edit.component';
import { EditorModule } from "@tinymce/tinymce-angular";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    NavComponent,
    JournalBookComponent,
    ResourceComponent,
    TrackerComponent,
    EntryComponent,
    NewEditComponent
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
    ReactiveFormsModule,
    EditorModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
