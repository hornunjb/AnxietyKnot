import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { HomeComponent } from './home/home.component';
import { JournalBookComponent } from './journal-book/journal-book.component';
import { ResourceComponent } from './resource/resource.component';
import { TrackerComponent } from './tracker/tracker.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'journalBook', component:JournalBookComponent},
  {path:'resource', component:ResourceComponent},
  {path:'tracker', component:TrackerComponent},
  {path:'entry', component:EntryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
