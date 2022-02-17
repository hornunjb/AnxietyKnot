import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PromptedEntry } from "../prompted-entry";
import { EntryService } from '../entry.service';
import { AuthService } from "../auth/auth.service";


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit, OnDestroy {
  entries: PromptedEntry[] = [];
  isLoading = false;
  userId: string;
  userIsAuthenticated = false;
 // public noHtmlContent: string[] = [];
 private entriesSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public entriesService: EntryService,
     private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.entriesService.getEntries();
    this.userId = this.authService.getUserId();
    this.entriesSub = this.entriesService
    .getEntryUpdateListener()
    .subscribe((entries: PromptedEntry[]) => {
      this.isLoading = false;
      this.entries = entries;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
     this.userId = this.authService.getUserId();
    });
  }

  onDelete(entryId: string) {
    this.isLoading = true;
    this.entriesService.deleteEntry(entryId);
  }

  ngOnDestroy() {
    this.entriesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
