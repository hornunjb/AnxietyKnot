import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PromptedEntry } from "../prompted-entry";
import { EntryService } from '../entry.service';

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
      this.entries = entries;
    });
  }

  onDelete(entryId: string) {
    this.entriesService.deleteEntry(entryId);
  }

  ngOnDestroy() {
    this.entriesSub.unsubscribe();
  }

}
