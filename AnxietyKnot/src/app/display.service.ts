import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { journalDisplay } from './journalDisplay.model';
import { PromptedEntry } from './prompted-entry.model';
import { Post } from "./post.model";



@Injectable({ providedIn: "root" })
export class DisplayService {
  private displays: journalDisplay[] = [];
  private displaysUpdated = new Subject<journalDisplay[]>();
  private entries: PromptedEntry[] = [];
  private entriesUpdated = new Subject<PromptedEntry[]>();
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();



  constructor(private http: HttpClient ) {}
  getEntries() {
    this.http
      .get<{ message: string; entries: any }>('http://localhost:3000/api/entries')
      .pipe(
        map(entryData => {
          return entryData.entries.map(entry => {
            return {
              id: entry._id,
              date: entry.date,
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
              creator: entry.creator
            };
          });
        })
      )
      .subscribe((transformedEntries) => {
        this.entries = transformedEntries;
        this.entriesUpdated.next([...this.entries]);
      });
  }

  getEntryUpdateListener() {
    return this.entriesUpdated.asObservable();
  }

  getEntry(id: string) {
    return this.http.get<{
    _id: string;
    date: Date,
    title: string;
    what_happened: string;
    going_through_mind: string;
    emotion1: string;
    intensity1: number;
    emotion2: string;
    intensity2: number;
    thought_patterns: Array<string>;
    custom_thought_patterns: string;
    thinking_differently: string;
    creator: string;
    }>("http://localhost:3000/api/entries/" + id);
  }
  /*
getEntry(id: string) {
    return {...this.entries.find(p => p.id === id)}
  }
  */


  addEntry
  ( date: Date,
    title: string,
    what_happened: string,
    going_through_mind: string,
    emotion1: string,
    intensity1: number,
    emotion2: string,
    intensity2: number,
    thought_patterns: Array<string>,
    custom_thought_patterns: string,
    thinking_differently: string )
    {
    const entry: PromptedEntry = {
      id: "",
      date: date,
      title: title,
      what_happened: what_happened,
      going_through_mind: going_through_mind,
      emotion1: emotion1,
      intensity1: intensity1,
      emotion2: emotion2,
      intensity2: intensity2,
      thought_patterns: thought_patterns,
      custom_thought_patterns: custom_thought_patterns,
      thinking_differently: thinking_differently,
      creator: null
    };
    this.http
      .post<{ message: string, entryId: string }>(
        "http://localhost:3000/api/entries", entry
        )
      .subscribe(responseData => {
        const id = responseData.entryId;
        entry.id = id;
        this.entries.push(entry);
        this.entriesUpdated.next([...this.entries]);
      });
  }

  updateEntry(
    id: string,
    date: Date,
    title: string,
    what_happened: string,
    going_through_mind: string,
    emotion1: string,
    intensity1: number,
    emotion2: string,
    intensity2: number,
    thought_patterns: Array<string>,
    custom_thought_patterns: string,
    thinking_differently: string,
  ){
    const entry: PromptedEntry = {
      id: id,
      date: date,
      title: title,
      what_happened: what_happened,
      going_through_mind: going_through_mind,
      emotion1: emotion1,
      intensity1: intensity1,
      emotion2: emotion2,
      intensity2: intensity2,
      thought_patterns: thought_patterns,
      custom_thought_patterns: custom_thought_patterns,
      thinking_differently: thinking_differently,
      creator: null
    };
    this.http.put("http://localhost:3000/api/entries/" + id, entry)
    .subscribe(response => console.log(response)
    // NAVIGATES USER AFTER POST UPDATE
       // this.router.navigate(["/"]);
    );
  }

  deleteEntry(entryId: string) {
    this.http.delete("http://localhost:3000/api/entries/" + entryId)
      .subscribe(() => {
        const updatedEntries = this.entries.filter(entry => entry.id !== entryId);
        this.entries = updatedEntries;
        this.entriesUpdated.next([...this.entries]);
      });
  }


  getPosts() {
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "http://localhost:3000/api/posts"
        //"http://nodejsangular-env.eba-3fswygyg.us-east-2.elasticbeanstalk.com/api/posts"
      )
      .pipe(
        map(postData => {
        return{
          posts: postData.posts.map(post => {
          return {
            id: post._id,
            date: post.date,

            title: post.title,
            content: post.content,
            creator: post.creator
          };
        }),
        maxPosts: postData.maxPosts
      };
    })
  )
  .subscribe(transformedPostData => {
        /// DISPLAY TRANSFOMRED POSTS INTO SCHEMA LIKE VIA BROWSER CONSOLE
        // console.log(transformedPosts);
        this.posts = transformedPostData.posts;
        this.postsUpdated.next([...this.posts]);
      });
    }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }


 // getPost(id: string) {
  //  return {...this.posts.find(p => p.id === id)}
 // }

//// THIS CODE AFFECTS 'GET POST' IN NEW-EDIT.COMPONENT.TS

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      date: Date;
      title: string;
      content: string;
      creator: string;
    }>("http://localhost:3000/api/posts/" + id);
  }

  addPost(date: Date, title: string, content: string) {
    const post: Post = {
      id: "",
      date: date,
      title: title,
      content: content,
      creator: null
    };
    this.http
      .post<{ message: string, postId: string }>(
        "http://localhost:3000/api/posts/", post
        )
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  // POST UPDATE ON POST EDIT
  updatePost(id: string, date: Date, title: string, content: string) {
    const post: Post = {
      id: id,
      date: date,
      title: title,
      content: content,
      creator: null
     };
    this.http.put("http://localhost:3000/api/posts/" + id, post)
    // OUTPUTS CONSOLE LOG OF SUCCESSFUL POST UPDATE
      .subscribe(response =>
       console.log(response)
       // NAVIGATES USER AFTER POST UPDATE
       // .subscribe(response => {
     // this.router.navigate(["/"]);
   //});
       );
   }


  deletePost(postId: string) {
    return this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}







