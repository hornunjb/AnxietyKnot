import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "../authenticate/auth.service";

const allowedEntryLength = 500;

@Component({
  selector: 'app-journal-book',
  templateUrl: './journal-book.component.html',
  styleUrls: ['./journal-book.component.css']
})
export class JournalBookComponent implements OnInit, OnDestroy{

  tip: string = '';
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

    tipMaker() {
      if (this.posts.length > 0) {
        if (this.posts.length == 10) {
          this.tip = "Develop a routine so that you're physically active most days of the week. Exercise is a powerful stress reducer. It can improve your mood and help you stay healthy. Start out slowly, and gradually increase the amount and intensity of your activities";
          return true;
        }
        if (this.posts.length == 5) {
          this.tip = "Nicotine and caffeine can worsen anxiety.";
          return true;
        }
      }
      return false;
    }

 /// THIS REMOVES HTML CODE FROM BEING DISPLAYED IN USER CREATED POSTS
  replace(content: any) {
  var parsedContent = content.replace(/<[^>]+>/g, '');
  if (parsedContent.length > allowedEntryLength) {
    return parsedContent.slice(0, allowedEntryLength) + '...';
  }
  return parsedContent;
}

/*setEntryLength(entryContent) {
    entryContent.truncate(250);
    return entryContent;
  }
*/


  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


}

