import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { HomeComponent } from './home/home.component';
import { JournalBookComponent } from './journal-book/journal-book.component';
import { PromptedEntryComponent } from './prompted-entry/prompted-entry.component';
import { ResourceComponent } from './resource/resource.component';
import { TrackerComponent } from './tracker/tracker.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path: '', component:NavComponent, children:[
    {path:'home', component:HomeComponent,},
    {path:'journalBook', component:JournalBookComponent},
    {path:'resource', component:ResourceComponent},
    {path:'tracker', component:TrackerComponent},
    {path:'entry', component:EntryComponent},
    {path:'prompted-entry', component:PromptedEntryComponent},
    {path:'list', component:PostListComponent},
    {path:'create', component:PostCreateComponent},
    {path:'edit/:postId', component:NewEditComponent},
    {path:'newEdit', component:NewEditComponent},
    {path:'edit/:postId', component:PostCreateComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
