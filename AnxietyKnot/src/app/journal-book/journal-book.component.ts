import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
//import { PageEvent } from '@angular/material/paginator';

import { Post } from "../post.model";
// import { PromptedEntry  } from "../prompted-entry";

import { PostsService } from "../posts.service";
import { AuthService } from "../auth/auth.service";



@Component({
  selector: 'app-journal-book',
  templateUrl: './journal-book.component.html',
  styleUrls: ['./journal-book.component.css']
})
export class JournalBookComponent implements OnInit, OnDestroy{

  posts: Post[] = [];
  isLoading = false;
  userId: string;
  userIsAuthenticated = false;
 // public noHtmlContent: string[] = [];
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  ///OLD CODE
  //private postsSub: Subscription = new Subscription;


  constructor(
    public postsService: PostsService,
    private authService: AuthService
    ) {}

 ngOnInit() {
  this.isLoading = true;
  this.postsService.getPosts();
  this.userId = this.authService.getUserId();
  this.postsSub = this.postsService
    .getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
       this.userId = this.authService.getUserId();
      });
    }


 /// THIS REMOVES HTML CODE FROM BEING DISPLAYED IN USER CREATED POSTS
  replace(content: any) {
  var parsedContent = content.replace(/<[^>]+>/g, '');
 return parsedContent;
 }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}

