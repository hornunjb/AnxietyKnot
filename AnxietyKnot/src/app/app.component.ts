import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";
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
  posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private postsSub!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
    // allows us to render posts when they are there
    this.postsSub = this.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  getPosts() {
    // send http request from angular app to our backend
    this.http.get<{message: string; posts: any}>('http://localhost:3000/api/posts/')
    // on the backend id is stored with an underscore, here we map it before we subscribe to it to change it to just id
    .pipe(map((postData) => {
      return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    // listen for request and retrieve body
    .subscribe(transformedPosts => {
      // setting our posts to the posts that are coming from the server (since they have the same format)
      this.posts = transformedPosts;
      // inform our app about this update, passing a copy of this.posts so we can't edit them
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: "", title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts/", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        // updates id of post we created
        post.id = id;
        // updating local data if we have a successful response from server-side
        this.posts.push(post);
        // inform our app about this update, passing a copy of this.posts so we can't edit them
        this.postsUpdated.next([...this.posts]);
      });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  onDelete(postId: string) {
    this.deletePost(postId);
  }

  deletePost(postId: string) {
    // adds our dynamic parameter to use on the backend
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      // filters posts to make sure we keep all entries where the postIds are not equal (we want to delete the one that is)
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      // send copy of posts so the app knows about it
      this.postsUpdated.next([...this.posts]);
    });
  }

}

