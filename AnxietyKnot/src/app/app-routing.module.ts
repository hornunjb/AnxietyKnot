import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PromptedEntryComponent } from './prompted-entry/prompted-entry.component';
import { ResourceComponent } from './resource/resource.component';
import { TrackerComponent } from './tracker/tracker.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from "./authenticate/auth.guard";
import { JournalHistoryComponent } from './journal-history/journal-history.component';
import { NavComponent } from './nav/nav.component';
import { JournalDisplayComponent } from './journal-display/journal-display.component';
import { JournalOptionComponent } from './journal-option/journal-option.component';

//import { HeaderComponent } from './header/header.component';


//-canActivate: [AuthGuard] ENSURES UNAUTHORIZED USERS CANNOT MANUALLY ENTER ACCESS POINT IN URL UNLESS LOGGED IN-//

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path: '', component:NavComponent, children:[

    {path:'home', component:HomeComponent,canActivate: [AuthGuard]},
   {path:'journalOption', component:JournalOptionComponent, canActivate: [AuthGuard]},
    {path: 'journalDisplay', component:JournalDisplayComponent, canActivate: [AuthGuard]},

  // {path:'journalBook', component:JournalHistoryComponent, canActivate: [AuthGuard]},
    {path:'resource', component:ResourceComponent, canActivate: [AuthGuard]},
    {path:'tracker', component:TrackerComponent, canActivate: [AuthGuard]},
    {path:'prompted-entry', component:PromptedEntryComponent, canActivate: [AuthGuard]},
    {path:'edit/:postId', component:NewEditComponent, canActivate: [AuthGuard]},
    {path:'edit-prompted/:entryId', component:PromptedEntryComponent, canActivate: [AuthGuard]},
    {path:'newEdit', component:NewEditComponent, canActivate: [AuthGuard]},

    {path:'header', component:JournalHistoryComponent, canActivate: [AuthGuard]},


    //{path: 'testpath', component:JournalDisplayComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
