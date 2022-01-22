import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://anxietyknot-env-1.eba-imk9a6by.us-east-2.elasticbeanstalk.com/api/posts"
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return {...this.posts.find(p => p.id === id)}
  }

  addPost(title: string, content: string) {
    const post: Post = { id: "", title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>("http://anxietyknot-env-1.eba-imk9a6by.us-east-2.elasticbeanstalk.com/api/posts/", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content};
    this.http.put("http://anxietyknot-env-1.eba-imk9a6by.us-east-2.elasticbeanstalk.com/api/posts/" + id, post)
    .subscribe(response => console.log(response));
  }

  deletePost(postId: string) {
    this.http.delete("http://anxietyknot-env-1.eba-imk9a6by.us-east-2.elasticbeanstalk.com/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
