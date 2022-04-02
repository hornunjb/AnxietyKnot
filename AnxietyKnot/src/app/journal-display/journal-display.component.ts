import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryService } from '../entry.service';
import { PostsService } from '../posts.service';
import { DisplayService } from '../display.service';
import { Post } from '../post.model';
import { PromptedEntry } from '../prompted-entry.model';
import { journalDisplay } from '../journalDisplay.model';
import { AuthService } from './../authenticate/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackerService } from '../tracker.service';


const allowedEntryLength = 500;

@Component({
  selector: 'app-journal-display',
  templateUrl: './journal-display.component.html',
  styleUrls: ['./journal-display.component.css'],
})
export class JournalDisplayComponent implements OnInit, OnDestroy {
  editPostId = ' ';
  editEntryId = ' ';
  tip: string = '';
  isLoading = false;
  userId: string;
  userIsAuthenticated = false;
  private displaysSub: Subscription;
  private authStatusSub: Subscription;
  posts: Post[] = [];
  entries: PromptedEntry[] = [];
  displays: journalDisplay[] = [];
  tipTracking: any = [];
  thisUsersEntries: any = [];
  thisUserDates: any = [];
  public noHtmlContent: string[] = [];
  counter: number = 0;

  constructor(
    public entriesService: EntryService,
    public postsService: PostsService,
    public displayService: DisplayService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private trackerService: TrackerService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.displayService.getEntries();
    this.userId = this.authService.getUserId();
    this.displaysSub = this.displayService
      .getEntryUpdateListener()
      .subscribe((entries: PromptedEntry[]) => {
        this.entries = entries;
        this.isLoading = false;
        entries.forEach((Element) => {
          Element.date = new Date(Element.date);
          var x = [
            Element.id,
            Element.date,
            Element.title,
            Element.what_happened,
          ];
          this.displays.push(Element);
          this.displays.sort((a, b) => a.title.localeCompare(b.title));
        });
      });
    this.isLoading = true;
    this.displayService.getPosts();
    this.userId = this.authService.getUserId();
    this.displaysSub = this.displayService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
        posts.forEach((Element) => {
          Element.date = new Date(Element.date);
          var x = [Element.id, Element.date, Element.title, Element.content];
          this.displays.push(Element);
          this.displays.sort((a, b) => a.title.localeCompare(b.title));
        });
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  openSnackBar(tip, action) {
    this._snackBar.open(tip, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['blue-snackbar'],
    });
  }

  selectCard(display: journalDisplay) {
    if (display.what_happened) {
      document.getElementById('prompted-edit').style.display = 'block';
      document.getElementById('unprompted-edit').style.display = 'none';
      this.editEntryId = display.id;
    } else {
      document.getElementById('prompted-edit').style.display = 'none';
      document.getElementById('unprompted-edit').style.display = 'block';

      this.editPostId = display.id;
    }
  }

  replace(content: any) {
    var parsedContent = content.replace(/<[^>]+>/g, '');
    if (parsedContent.length > allowedEntryLength) {
      return parsedContent.slice(0, allowedEntryLength) + '...';
    }
    return parsedContent;
  }

  refreshPage() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  onDeleteEntry(Id: string) {
    this.entriesService.deleteEntry(Id);
    const removeIndex = this.displays.findIndex((item) => item.id === Id);
    this.displays.splice(removeIndex, 1);
    let currentUrl = this.router.url;
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = 'reload';
     this.router.navigate([currentUrl]);
  }

  onDeletePost(Id: string) {
    this.postsService.deletePost(Id);
    const removeIndex = this.displays.findIndex((item) => item.id === Id);
    this.displays.splice(removeIndex, 1);
    let currentUrl = this.router.url;
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = 'reload';
     this.router.navigate([currentUrl]);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.displaysSub.unsubscribe();
  }

  setEntryLength(entryContent) {
    entryContent.truncate(250);
    return entryContent;
  }

  displayCounter(displays) {
    this.counter = 0;
    this.thisUsersEntries = [];
    for (var i = 0; i < displays.length; i++) {
      if (this.userIsAuthenticated && this.userId == displays[i].creator) {
        this.counter++;
        this.thisUsersEntries.push(parseInt((displays[i].mood)));
        this.trackerService.addMoods(this.thisUsersEntries);
        console.log(this.thisUsersEntries);
      }
    }
  }
}
