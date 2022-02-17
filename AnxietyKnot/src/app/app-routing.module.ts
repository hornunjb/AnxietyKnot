import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { JournalBookComponent } from './journal-book/journal-book.component';
import { PromptedEntryComponent } from './prompted-entry/prompted-entry.component';
import { ResourceComponent } from './resource/resource.component';
import { TrackerComponent } from './tracker/tracker.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
//import { HeaderComponent } from './header/header.component';
import { AuthGuard } from "./auth/auth.guard";
import { JournalHistoryComponent } from './journal-history/journal-history.component';
//import { EntryListComponent } from './entry-list/entry-list.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'home', component:HomeComponent},

  ///REMOVE TO SHOW PROMPTED TABES IN JOURNAL HISTORY
 // {path:'journalBook', component:JournalBookComponent},
 
 {path:'newEdit', component:NewEditComponent, canActivate: [AuthGuard]},
 {path:'edit/:postId', component:NewEditComponent,canActivate: [AuthGuard]},
  {path: 'prompted-entry', component:PromptedEntryComponent,canActivate: [AuthGuard]},
  {path:'edit-prompted/:entryId', component:PromptedEntryComponent, canActivate: [AuthGuard]},

  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},

  {path:'journalBook', component:JournalHistoryComponent},
  {path:'resource', component:ResourceComponent},
  {path:'tracker', component:TrackerComponent},
  //{path: 'entry-list', component:EntryListComponent},



  /// HEADER NOT IN APPLICATION, WILL USE AS FUTURE USER ACCOUNT PAGE
  //{path:'header', component: HeaderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
