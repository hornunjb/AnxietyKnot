import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EntryService } from '../entry.service';
import { PostsService } from '../posts.service';
import { DisplayService } from '../display.service';

import { Post } from '../post.model';
import { PromptedEntry } from '../prompted-entry.model';
import { journalDisplay } from '../journalDisplay.model';

import { AuthService } from "./../authenticate/auth.service";
import { Router } from "@angular/router";

import { creator } from 'd3';


const allowedEntryLength = 500;

@Component({
  selector: 'app-journal-display',
  templateUrl: './journal-display.component.html',
  styleUrls: ['./journal-display.component.css']
})
export class JournalDisplayComponent implements OnInit, OnDestroy {

  editPostId = ' ';
  editEntryId = ' ';


  tip: string = '';
  isLoading = false;
  userId: string;
  userIsAuthenticated = false;

 // private postsSub: Subscription;
  //private entriesSub: Subscription;
  private displaysSub: Subscription;
  private authStatusSub: Subscription;


  posts: Post[] = [];
  entries: PromptedEntry[] = [];
  displays: journalDisplay[] = [];


 public noHtmlContent: string[] = [];


  constructor(
    public entriesService: EntryService,
    public postsService: PostsService,
    public displayService: DisplayService,
    private router: Router,
    private authService: AuthService,
    ) { }


    ngOnInit() {
  this.isLoading = true;

   // getEntries() located in 'entry.service.ts'
  this.displayService.getEntries();
      this.userId = this.authService.getUserId();
      this.displaysSub = this.displayService
      .getEntryUpdateListener()
      .subscribe((entries: PromptedEntry[]) =>
      {
        this.entries = entries;
        this.isLoading = false;
        entries.forEach(Element =>
          {
          Element.date = new Date(Element.date)
          //console.log(typeof(Element.date))
         // console.log(Element.date)
         var x = [Element.id, Element.date, Element.title, Element.what_happened];
          this.displays.push(Element);
          this.displays.sort((a, b) => a.title.localeCompare(b.title))
        });
      });
     this.isLoading = true;
      // getPosts() located in 'posts.service.ts'

      this.displayService.getPosts();
      this.userId = this.authService.getUserId();
      this.displaysSub = this.displayService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) =>
        {
          this.isLoading = false;

         this.posts = posts;
          posts.forEach(Element =>
            {
              Element.date = new Date(Element.date)
              var x = [Element.id, Element.date, Element.title, Element.content];
              this.displays.push(Element);
              this.displays.sort((a, b) => a.title.localeCompare(b.title))
          });
        });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated =>
          {
          this.userIsAuthenticated = isAuthenticated;
         this.userId = this.authService.getUserId();
        });
      }


    selectCard(display: journalDisplay){
      if(display.what_happened){
        document.getElementById("prompted-edit").style.display = 'block';
        document.getElementById("unprompted-edit").style.display = 'none';
        this.editEntryId = display.id;
      }else{
        document.getElementById("prompted-edit").style.display = 'none';
        document.getElementById("unprompted-edit").style.display = 'block';

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


   onDeleteEntry(Id: string ) {
    this.isLoading = true;
    //---CAUSES ERROR IN FIREFOX--//
   // window.location.reload();

    // METHOD CALLED FROM entry.service.ts
         // DO NOT CHANGE SERVICE FOR DELETE, PREVENTS DUPLICATE ENTRIES
      this.entriesService.deleteEntry(Id);

      const removeIndex = this.displays.findIndex( item => item.id === Id );
      this.displays.splice( removeIndex, 1 );

      let currentUrl = this.router.url;
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = 'reload';
     this.router.navigate([currentUrl]);
    };

    onDeletePost(Id: string) {
      this.isLoading = true;
      //---CAUSES ERROR IN FIREFOX--//
     // window.location.reload();

     //METHOD CALLED FROM posts.service.ts
     // DO NOT CHANGE SERVICE FOR DELETE, PREVENTS DUPLICATE POSTS
      this.postsService.deletePost(Id)
      const removeIndex = this.displays.findIndex( item => item.id === Id );
      this.displays.splice( removeIndex, 1 );

     let currentUrl = this.router.url;
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = 'reload';
     this.router.navigate([currentUrl]);
    };

    ngOnDestroy() {
     // this.postsSub.unsubscribe();
     // this.entriesSub.unsubscribe();
     this.displaysSub.unsubscribe();
      this.authStatusSub.unsubscribe();


    }


    setEntryLength(entryContent) {
      entryContent.truncate(250);
      return entryContent;
    }

     tipMaker() {
    if (this.displays.length > 0) {
      if (this.displays.length > 10) {
        this.tip = "Develop a routine so that you're physically active most days of the week. Exercise is a powerful stress reducer. It can improve your mood and help you stay healthy. Start out slowly, and gradually increase the amount and intensity of your activities";
        return true;
      }
      if (this.displays.length == 5) {
        this.tip = "Nicotine and caffeine can worsen anxiety.";
        return true;
      }
    }
    return false;
  }
}








