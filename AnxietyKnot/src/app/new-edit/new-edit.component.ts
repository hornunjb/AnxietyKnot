import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncSubject, Subject } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
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
export class NewEditComponent implements OnInit {


  @Input() editPostId = ' ';
  ngOnChanges(){
    this.ngOnInit();
  }

  value = 0;
  ratingCount = 10;
  response = [
    'Rate your mood?',
    'Really?',
    'Hang on',
    'It can be better',
    "I've been worse",
    'Not much',
    'Getting better',
    'Pretty good',
    'Lets go',
    'I feel good',
    'Yesir',
  ];
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  public post: Post;
  public static text: string;

  private editorSubject: Subject<any> = new AsyncSubject();
  public myForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  date = new FormControl(moment());

  openDialog() {
    this.dialogRef.open(PopupComponent);
  }

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId') || (this.editPostId != ' ')) {
        this.mode = 'edit';
        if(this.editPostId != ' '){
          this.postId = this.editPostId;
        }else{
        this.postId = paramMap.get('postId');
        };
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'create';
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
    if (this.mode === 'create') {
      this.postsService.addPost(
        date,
        this.myForm.value['title'],
        this.myForm.value['body']
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        date,
        this.myForm.value['title'],
        this.myForm.value['body']
      );
    }
  }
}
