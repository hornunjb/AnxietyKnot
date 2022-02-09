import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";
import { PromptedEntry } from "./prompted-entry";
import { Subject, Subscription } from "rxjs";
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AnxietyKnot';
  entries: PromptedEntry[] = [];
  private entriesUpdated = new Subject<PromptedEntry[]>();
  private entriesSub!: Subscription;




  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEntries();
    // allows us to render posts when they are there
    this.entriesSub = this.getEntryUpdateListener()
    .subscribe((entries: PromptedEntry[]) => {
      this.entries = entries;
    });


  }

  ngOnDestroy() {
    this.entriesSub.unsubscribe();



  }

  getEntries() {
    // send http request from angular app to our backend

    this.http.get<{message: string; entries: any}>('http://localhost:3000/api/entries')

    // This will retrieve unprompted entries from the AWS server. Will need to be updated to also retrieve entries(prompted posts) once those are on the AWS server also
    //this.http.get<{message: string; posts: any}>('http://anxietyknot-env-1.eba-imk9a6by.us-east-2.elasticbeanstalk.com/api/posts')

    // on the backend id is stored with an underscore, here we map it before we subscribe to it to change it to just id
    .pipe(map((entryData) => {
      return entryData.entries.map((entry: {
        title: any;
    what_happened: any;
    going_through_mind: any;
    emotion1: any;
    intensity1: any;
    emotion2: any;
    intensity2: any;
    thought_patterns: any;
    custom_thought_patterns: any;
    thinking_differently: any;
        _id: any; }) => {
        return {
          id: entry._id,
              title: entry.title,
              what_happened: entry.what_happened,
              going_through_mind: entry.going_through_mind,
              emotion1: entry.emotion1,
              intensity1: entry.intensity1,
              emotion2: entry.emotion2,
              intensity2: entry.intensity2,

              thought_patterns: entry.thought_patterns,
              custom_thought_patterns: entry.custom_thought_patterns,
              thinking_differently: entry.thinking_differently,
        };
      });
    }))
    // listen for request and retrieve body
    .subscribe(transformedEntries => {
      // setting our posts to the posts that are coming from the server (since they have the same format)
      this.entries = transformedEntries;
      // inform our app about this update, passing a copy of this.posts so we can't edit them
      this.entriesUpdated.next([...this.entries]);
    });
  }

  getEntryUpdateListener() {
    return this.entriesUpdated.asObservable();
  }

  addEntry(
    title: string,
    what_happened: string,
    going_through_mind: string,
    emotion1: string,
    intensity1: number,
    emotion2: string,
    intensity2: number,
    thought_patterns: Array<string>,
    custom_thought_patterns: string,
    thinking_differently: string,) {
    const entry: PromptedEntry = {
      id: "",
      title: title,
      what_happened: what_happened,
    going_through_mind: going_through_mind,
    emotion1: emotion1,
    intensity1: intensity1,
    emotion2: emotion2,
    intensity2: intensity2,

    thought_patterns: thought_patterns,
    custom_thought_patterns: custom_thought_patterns,
    thinking_differently: thinking_differently, };
    this.http

      .post<{ message: string, entryId: string }>("http://localhost:3000/api/entries", entry)

      //.post<{ message: string, postId: string }>("http://localhost:3000/api/posts/", post)

      .subscribe(responseData => {
        const id = responseData.entryId;
        // updates id of post we created
        entry.id = id;
        // updating local data if we have a successful response from server-side
        this.entries.push(entry);
        // inform our app about this update, passing a copy of this.posts so we can't edit them
        this.entriesUpdated.next([...this.entries]);
      });
  }

  onAddEntry(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.addEntry(
      form.value.title,
      form.value.what_happened,
      form.value.going_through_mind,
      form.value.emotion1,
      form.value.intensity1,
      form.value.emotion2,
      form.value.intensity2,
      form.value.thought_patterns,
      form.value.custom_thought_patterns,
      form.value.thinking_differently,);
    form.resetForm();
  }

  onDeleteEntry(entryId: string) {
    this.deleteEntry(entryId);
  }

  deleteEntry(entryId: string) {
    // adds our dynamic parameter to use on the backend

    this.http.delete("http://localhost:3000/api/entries/" + entryId)

    //this.http.delete("http://anxietyknot-env-1.eba-imk9a6by.us-east-2.elasticbeanstalk.com/api/posts/" + postId)

    .subscribe(() => {
      // filters posts to make sure we keep all entries where the postIds are not equal (we want to delete the one that is)
      const updatedEntries = this.entries.filter(entry => entry.id !== entryId);
      this.entries = updatedEntries;
      // send copy of posts so the app knows about it
      this.entriesUpdated.next([...this.entries]);
    });
  }


}

