import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncSubject, Subject, Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

import { AuthService } from "../auth/auth.service";



@Component({
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.css']
})

export class NewEditComponent implements OnInit, OnDestroy{

  value = 0;
  ratingCount = 10;
  enteredTitle = "";
  enteredContent = "";
  isLoading = false;
  public post: Post;
  private mode = 'create';
  private postId: string;
  public static text: string;
  private authStatusSub: Subscription;
  private editorSubject: Subject<any> = new AsyncSubject();
  response = ["Rate your mood?","Really?", "Hang on",
  "It can be better", "I've been worse", "Not much",
  "Getting better", "Pretty good", "Lets go", "I feel good", "Yesir"]

  public myForm = new FormGroup(
    {
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
    }
  );

  openDialog(){
    this.dialogRef.open(PopupComponent);
  }

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  constructor(
    public postsService: PostsService,
     public route: ActivatedRoute,
     private dialogRef: MatDialog,
     private authService: AuthService,

     ) {}

     ngOnInit() {
       // USED TO PREVENT LOADING ISSUES DUE TO FAILURE
      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("postId")) {
          this.mode = "edit";
          this.postId = paramMap.get("postId");
          this.isLoading = true;
          this.postsService.getPost(this.postId).subscribe(postData => {
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
              creator: postData.creator
            };
            this.myForm.setValue({
              title: this.post.title,
              body: this.post.content
            });
          });
        } else {
          this.mode = "create";
          this.postId = null;
        }
      });
    }



    onSubmit() {
      this.openDialog();
      if (this.myForm.invalid) {
        return;
      }
      this.isLoading = true;
      if (this.mode === 'create')
      {
        this.postsService.addPost(
          this.myForm.value['title'],
          this.myForm.value['body']
          );
      }
      else {
        this.postsService.updatePost(
          this.postId,
          this.myForm.value['title'],
          this.myForm.value['body']
          );
      }
      this.myForm.reset();
    }
     // USED TO PREVENT LOADING ISSUES DUE TO FAILURE
    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }
}
