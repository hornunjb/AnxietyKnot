import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EntryService } from '../entry.service';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PromptedEntry } from '../prompted-entry.model';

import { journalDisplay } from '../journalDisplay.model';

import { AuthService } from "./../authenticate/auth.service";


const allowedEntryLength = 500;

@Component({
  selector: 'app-journal-display',
  templateUrl: './journal-display.component.html',
  styleUrls: ['./journal-display.component.css']
})
export class JournalDisplayComponent implements OnInit, OnDestroy {


  tip: string = '';
  isLoading = false;
  userId: string;
  userIsAuthenticated = false;

  private postsSub: Subscription;
  private entriesSub: Subscription;
  private displaysSub: Subscription;
  private authStatusSub: Subscription;

  posts: Post[] = [];
  entries: PromptedEntry[] = [];
  displays: journalDisplay[] = [];


 public noHtmlContent: string[] = [];

  constructor( public entriesService: EntryService,
    public postsService: PostsService, private authService: AuthService) { }


    ngOnInit() {
      this.isLoading = true;

      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(_authStatus => {
        this.isLoading = false;
      });
      
      this.entriesService.getEntries();
      this.entriesSub = this.entriesService.getEntryUpdateListener()
      .subscribe((entries: PromptedEntry[]) =>
      {
        entries.forEach(Element =>
          {
          this.isLoading = false;

          Element.date = new Date(Element.date)
          console.log(typeof(Element.date))
          console.log(Element.date)
        });
        this.entries = entries;
        this.entries.forEach(Element =>
          {
          var x = [Element.id, Element.date, Element.title, Element.what_happened];
          this.displays.push(Element);
        });


        //this.displays.sort((x, y) => y.date.getDate() - x.date.getDate());

        // this.display.sort((first, second) =>
        // 0 - (first.intensity1 > second.intensity1 ? -1 : 1));
        this.displays.sort((a, b) => a.title.localeCompare(b.title))


      });
      this.isLoading = true;

      this.postsService.getPosts();
      this.userId = this.authService.getUserId();

      this.postsSub = this.postsService
        .getPostUpdateListener()
        .subscribe((posts: Post[]) =>
        {
          posts.forEach(Element =>
            {
              this.isLoading = false;
            Element.date = new Date(Element.date)
          });
          this.posts = posts;
          this.posts.forEach(Element =>
            {
            var x = [Element.id, Element.date, Element.title, Element.content];
            this.displays.push(Element);
          });

          //this.displays.sort((x, y) => y.date.getDate() - x.date.getDate());
          this.displays.sort((a, b) => a.title.localeCompare(b.title))

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





    //testing sorting by int, will change to sort by date
    // sort_entries = this.entries.sort((first, second) =>
    // 0 - (first.intensity1 > second.intensity1 ? -1 : 1));

    replace(content: any) {
      var parsedContent = content.replace(/<[^>]+>/g, '');
      if (parsedContent.length > allowedEntryLength) {
        return parsedContent.slice(0, allowedEntryLength) + '...';
      }
      return parsedContent;
    }



    onDeleteEntry(Id: string ) {
      //may need to change to be more efficient
      this.entriesService.deleteEntry(Id);

      const removeIndex = this.displays.findIndex( item => item.id === Id );
      this.displays.splice( removeIndex, 1 );
    }
    onDeletePost(Id: string ) {
      //may need to change to be more efficient
      this.postsService.deletePost(Id);


      const removeIndex = this.displays.findIndex( item => item.id === Id );
      this.displays.splice( removeIndex, 1 );
    }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
      this.entriesSub.unsubscribe();
      this.authStatusSub.unsubscribe();
    }


    setEntryLength(entryContent) {
      entryContent.truncate(250);
      return entryContent;
    }

    tipMaker() {
      if (this.displays.length > 0) {
        if (this.displays.length == 10) {
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








