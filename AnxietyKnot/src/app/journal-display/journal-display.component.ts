import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryService } from '../entry.service';
import { journalDisplay } from '../journalDisplay.model';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PromptedEntry } from '../prompted-entry';
import { NewEditComponent } from '../new-edit/new-edit.component';

const allowedEntryLength = 500;

@Component({
  selector: 'app-journal-display',
  templateUrl: './journal-display.component.html',
  styleUrls: ['./journal-display.component.css']
})
export class JournalDisplayComponent implements OnInit {

  posts: Post[] = [];
  entries: PromptedEntry[] = [];

  editId: string;

  displays: journalDisplay[] = [];
  private entriesSub: Subscription = new Subscription;

  public noHtmlContent: string[] = [];
  private postsSub: Subscription = new Subscription();
  tip: string = '';

  constructor(public entriesService: EntryService,
    public postsService: PostsService) { }


  ngOnInit() {

    this.entriesService.getEntries();
    this.entriesSub = this.entriesService.getEntryUpdateListener()
    .subscribe((entries: PromptedEntry[]) => {
      entries.forEach(Element =>{
        Element.date = new Date(Element.date)
        console.log(typeof(Element.date))
        console.log(Element.date)
      });
      this.entries = entries;
      this.entries.forEach(Element =>{
        var x = [Element.id, Element.date, Element.title, Element.what_happened];
        this.displays.push(Element);
      });
      //this.displays.sort((x, y) => y.date.getDate() - x.date.getDate());

      // this.display.sort((first, second) =>
      // 0 - (first.intensity1 > second.intensity1 ? -1 : 1));
      this.displays.sort((a, b) => a.title.localeCompare(b.title))

    });

    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        posts.forEach(Element =>{
          Element.date = new Date(Element.date)

        });
        this.posts = posts;

        this.posts.forEach(Element =>{
          var x = [Element.id, Element.date, Element.title, Element.content];
          this.displays.push(Element);
        });

        //this.displays.sort((x, y) => y.date.getDate() - x.date.getDate());
        this.displays.sort((a, b) => a.title.localeCompare(b.title))

      })



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

  editPost(Id: string){
    this.editId = Id;
    // document.getElementById("edit").style.display = "block";
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
    this.entriesSub.unsubscribe();
    this.postsSub.unsubscribe();
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








