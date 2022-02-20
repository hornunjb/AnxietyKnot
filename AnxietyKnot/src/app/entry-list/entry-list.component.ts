import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PromptedEntry } from "../prompted-entry";
import { EntryService } from '../entry.service';
import { utcSeconds } from 'd3';


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit, OnDestroy {

  entries: PromptedEntry[] = [];

  private entriesSub: Subscription = new Subscription;

  constructor(public entriesService: EntryService) { }

  ngOnInit() {
    this.entriesService.getEntries();
    this.entriesSub = this.entriesService.getEntryUpdateListener()
    .subscribe((entries: PromptedEntry[]) => {
      entries.forEach(Element =>{
        Element.date = new Date(Element.date)
        console.log(typeof(Element.date))
        console.log(Element.date)
      });

      this.entries = entries.sort((x, y) => y.date.getDate() - x.date.getDate());
      // this.entries = entries.sort((first, second) =>
      // 0 - (first.intensity1 > second.intensity1 ? -1 : 1));



    });
  }
  logger() {
    this.entries.forEach(Element =>{
      Element.date = new Date(Element.date)
      console.log(typeof(Element.date))
    })
  }



  //testing sorting by int, will change to sort by date
  // sort_entries = this.entries.sort((first, second) =>
  // 0 - (first.intensity1 > second.intensity1 ? -1 : 1));



  onDelete(entryId: string) {
    this.entriesService.deleteEntry(entryId);
  }

  ngOnDestroy() {
    this.entriesSub.unsubscribe();
  }

}
