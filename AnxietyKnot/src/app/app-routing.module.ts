import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { JournalBookComponent } from './journal-book/journal-book.component';
import { ResourceComponent } from './resource/resource.component';
import { TrackerComponent } from './tracker/tracker.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { NewEditComponent } from './new-edit/new-edit.component';

const routes: Routes = [
  {path:'journalBook', component:JournalBookComponent},
  {path:'resource', component:ResourceComponent},
  {path:'tracker', component:TrackerComponent},
  {path:'entry', component:EntryComponent},
  {path:'list', component:PostListComponent},
  {path:'create', component:PostCreateComponent},
  {path:'edit/:postId', component:NewEditComponent},
  {path:'newEdit', component:NewEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
