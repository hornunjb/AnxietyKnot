import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JournalBookComponent } from './journal-book/journal-book.component';
import { PromptedEntryComponent } from './prompted-entry/prompted-entry.component';
import { ResourceComponent } from './resource/resource.component';
import { TrackerComponent } from './tracker/tracker.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

import { EntryListComponent } from './entry-list/entry-list.component';

//const routes: Routes = [
//  {path:'journalBook', component:EntryListComponent},

import { NewEditComponent } from './new-edit/new-edit.component';
import { JournalHistoryComponent } from './journal-history/journal-history.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'home', component:HomeComponent},
  //{path:'journalBook', component:JournalBookComponent},
  //{path:'journalBook', component:EntryListComponent},
  {path:'journalBook', component:JournalHistoryComponent},
  {path:'edit-prompted/:entryId', component:PromptedEntryComponent},


  {path:'resource', component:ResourceComponent},
  {path:'tracker', component:TrackerComponent},

  {path:'entry', component:EntryComponent},
  {path: 'prompted-entry', component:PromptedEntryComponent},

//  {path: 'entry-list', component:EntryListComponent},

  {path:'list', component:PostListComponent},
  {path:'create', component:PostCreateComponent},
 // {path:'edit/:postId', component:PromptedEntryComponent}



  {path:'list', component:PostListComponent},
  {path:'create', component:PostCreateComponent},
  {path:'edit/:postId', component:NewEditComponent},
  {path:'newEdit', component:NewEditComponent},
  {path:'edit/:postId', component:PostCreateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
