import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

const allowedEntryLength = 500;

@Component({
  selector: 'app-journal-book',
  templateUrl: './journal-book.component.html',
  styleUrls: ['./journal-book.component.css'],
})
export class JournalBookComponent {
  posts: Post[] = [];
  public noHtmlContent: string[] = [];
  private postsSub: Subscription = new Subscription();
  tip: string = '';

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  replace(content: any) {
    var parsedContent = content.replace(/<[^>]+>/g, '');
    if (parsedContent.length > allowedEntryLength) {
      return parsedContent.slice(0, allowedEntryLength) + '...';
    }
    return parsedContent;
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  setEntryLength(entryContent) {
    entryContent.truncate(250);
    return entryContent;
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
}
