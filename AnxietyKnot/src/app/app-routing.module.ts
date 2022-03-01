import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { JournalBookComponent } from './journal-book/journal-book.component';
import { PromptedEntryComponent } from './prompted-entry/prompted-entry.component';
import { ResourceComponent } from './resource/resource.component';
import { TrackerComponent } from './tracker/tracker.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//import { HeaderComponent } from './header/header.component';
import { AuthGuard } from "./authenticate/auth.guard";
import { JournalHistoryComponent } from './journal-history/journal-history.component';
//import { EntryListComponent } from './entry-list/entry-list.component';
import { NavComponent } from './nav/nav.component';
//import { JournalDisplayComponent } from './journal-display/journal-display.component';


/*

  /// HEADER NOT IN APPLICATION, WILL USE AS FUTURE USER ACCOUNT PAGE
  //{path:'header', component: HeaderComponent},

];
 */


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path: '', component:NavComponent, children:[
    {path:'home', component:HomeComponent,},
    {path:'journalBook', component:JournalHistoryComponent},
    {path:'resource', component:ResourceComponent},
    {path:'tracker', component:TrackerComponent},
    {path:'prompted-entry', component:PromptedEntryComponent},

    {path:'edit/:postId', component:NewEditComponent},
    {path:'edit-prompted/:entryId', component:PromptedEntryComponent},
    {path:'newEdit', component:NewEditComponent},
    //{path: 'journalDisplay', component:JournalDisplayComponent},

    //{path: 'testpath', component:JournalDisplayComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
