import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";


import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncSubject, Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from "../authenticate/auth.service";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class NewEditComponent implements OnInit, OnDestroy{


  @Input() editPostId = ' ';
  ngOnChanges(){
    this.ngOnInit();
  }

  date = new FormControl(moment());


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
  response = [
    "Rate your mood?",
    "Really?",
    "Hang on",
    "It can be better",
    "I've been worse",
    "Not much",
    "Getting better",
    "Pretty good",
    "Lets go",
    "I feel good",
    "Yesir"
];


  /// ENSURES ALL REQUIRED FIELDS ARE FILLED BEFORE SUMIT BUTTON CAN BECOME ACTIVE
  /// THIS ALSO MUST MATCH WITH THE SCHEMA
  public myForm = new FormGroup(
    {
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
    }
  );




  openDialog() {
    this.dialogRef.open(PopupComponent);
  }


  ///NEW CODING FROM BRANCH NOT YET IMPLEMENTED
  /*

  ///Requires removal of onSubmit() coding and in html
 openDialog() {
  async openDialog() {
    const dialogRef = this.dialogRef.open(PopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.value = result;
      console.log(this.value);
    });
    await dialogRef.afterClosed().toPromise();
    let date = this.date.value.toDate();
    if (this.myForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(
        date,
        this.myForm.value['title'],
        this.myForm.value['body'],
        this.value
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        date,
        this.myForm.value['title'],
        this.myForm.value['body'],
        this.value
      );
    }
  }
  */
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
      .subscribe(_authStatus => {
        this.isLoading = false;
      });
      this.route.paramMap.subscribe((paramMap: ParamMap) =>
       {
        if (paramMap.has('postId') || (this.editPostId != ' '))
        {
          this.mode = "edit";
         // this.postId = paramMap.get("postId");
         if (this.editPostId != ' ')
         {
          this.postId = this.editPostId;
        }
          else {
            this.postId = paramMap.get("postId");
          }
          this.isLoading = true;
          this.postsService.getPost(this.postId).subscribe(postData =>
             {
            this.isLoading = false;
            /// POSTDATA PASSES THROUGH POST.SERVICE AND DISPLAY.SERVICE
            this.post = {
              id: postData._id,
              date: postData.date,
              title: postData.title,
              content: postData.content,
              creator: postData.creator
            };
            /// THIS DOESNT SEEM TO HAVE ANY IMPACT IF REMOVED BUT KEEP FOR DATE
            this.myForm.setValue({
              title: this.post.title,
              body: this.post.content
            });
          })
          } else {
          this.mode = "create";
          this.postId = null;
        }
      });
    }

    onSubmit() {
      
      this.openDialog();
      let date = this.date.value.toDate();
      if (this.myForm.invalid) {
        return;
      }
      this.isLoading = true;
      if (this.mode === 'create')
      {
        this.postsService.addPost(
          date,
          this.myForm.value['title'],
          this.myForm.value['body']
          );
      }
      else {
        this.postsService.updatePost(
          this.postId,
          date,
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
