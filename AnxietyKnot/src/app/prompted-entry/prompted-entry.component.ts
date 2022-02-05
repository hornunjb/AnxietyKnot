import { PromptedEntry } from '../prompted-entry';
import { PostsService } from "../posts.service";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncSubject, Subject } from 'rxjs';
import { Post } from '../post.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { MatIconModule } from '@angular/material/icon'
import { DistortionDialogComponent } from '../distortion-dialog/distortion-dialog.component';


@Component({
  selector: 'app-prompted-entry',
  templateUrl: './prompted-entry.component.html',
  styleUrls: ['./prompted-entry.component.css']
})
export class PromptedEntryComponent {
  value = 0;
  ratingCount = 10;
  response = ["Rate your mood?",
    "Really?", "Hang on", "It can be better", "I've been worse", "Not much", "Getting better", "Pretty good", "Lets go", "I feel good", "Yesir"]
  enteredTitle = "";
  enteredContent = "";
  private mode = 'create';
  private postId: string;
  public post: Post;
  public static text: string;
  enteredWhat_happened= "";
  enteredGoing_through_mind= "";
  enteredEmotion1= "";
  enteredIntensity1= "";
  enteredEmotion2= "";
  enteredIntensity2= "";

  enteredThought_patterns= "";
  enteredCustom_thought_patterns= "";
  enteredThinking_differently= "";

  public intensities: Array<number>= [1,2,3,4,5,6,7,8,9,10];


  private editorSubject: Subject<any> = new AsyncSubject();
  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
  });

  openDialog(){
    if(this.dialogRef.openDialogs.length == 0){
      this.dialogRef.open(PopupComponent, {
        disableClose: false
      });
    }
  }

  openDistortionDialog() {
    if(this.dialogRef.openDialogs.length == 0){
      this.dialogRef.open(DistortionDialogComponent, {
        disableClose: false
      });
    }
  }

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  constructor(public postsService: PostsService, public route: ActivatedRoute, private dialogRef: MatDialog) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }


  onSavePost(form: NgForm) {
    this.openDialog();
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.what_happened);
    }
    else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.what_happend);
    }
    form.resetForm();
  }
}
