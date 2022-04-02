import { Component, OnDestroy, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
//--FORM CONTROL AND FORM GROUP CANNOT BE USED WITH NGFORM--//

import { ActivatedRoute, ParamMap, Router} from '@angular/router';
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
import { DisplayService } from '../display.service';
import { EventEmitter } from '@angular/core';
import { filter } from 'rxjs/operators';
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
  @Output() newData: EventEmitter<any> = new EventEmitter();

  @Input() editPostId = ' ';
  ngOnChanges(){
    this.ngOnInit();
  }

  date = new FormControl(moment());
  value = '';
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
    body: new FormControl("", Validators.required),
    }
  );

  async openDialog() {
    const dialogRef = this.dialogRef.open(PopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.value = result;
      //console.log(this.value);
    });
    await dialogRef.afterClosed().toPromise();
    let date = this.date.value.toDate();
    if (this.myForm.invalid) {
      return;
    }     
	this.isLoading = true;
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
   // this.myForm.reset();

  /*
  1. Getting rid of this router prevents duuplicate when saving edits on JD screen
  2. Journal Book Page still refreshes after saving edits
  3.  New entry submits direct users to JD, but entry will not show until you hit refresh
  4. This Does Cause the Mood Tracker to delay updates on Input Moods if moviing directly from JournalBook (JD) to Tracker (This Only Affects Creating New entries)
     Update: No Longer an issue if using 'window.location.reload()'
  5. Double clicking Tracker tab no longer causes mood graph to fail on loading.

  Side Note: Tracker fails to load graph on double click in Navigation and during re-complile.
  Side Note: Tracker Mood inputs fail to load In Tracker IF Refreshing the Tracker page
*/
 /* let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]); */

    //THIS ONLY WORKS WITH CHROME. HTTP ERROR IN FIREFOX AND WILL NOT CREATE POSTS
    window.location.reload();

    //window.location.reload();
    this.newData.emit();
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
     private router: Router
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
         if (this.editPostId != ' ') {
           this.postId = this.editPostId;
          } else {
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
              mood: this.value,
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
    }

 // USED TO PREVENT LOADING ISSUES DUE TO FAILURE
    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }
}
