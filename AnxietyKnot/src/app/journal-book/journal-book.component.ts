import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Post } from "../post.model";
import { PostsService } from "../posts.service";




@Component({
  selector: 'app-journal-book',
  templateUrl: './journal-book.component.html',
  styleUrls: ['./journal-book.component.css']
})
export class JournalBookComponent {



  posts: Post[] = [];
  public noHtmlContent: string[] = [];
  private postsSub: Subscription = new Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    }

  replace(content: any) {
    var parsedContent = content.replace(/<[^>]+>/g, '');
    return parsedContent;
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

