import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient ) {}

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

  addPost(date: Date, title: string, content: string, mood: string) {
    const post: Post = { id: "", date: date,  title: title, content: content, creator: null, mood: mood };
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

  updatePost(id: string, date: Date, title: string, content: string, mood: string) {
    const post: Post = { id: id, date: date, title: title, content: content, creator: null, mood: mood};
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
     this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
