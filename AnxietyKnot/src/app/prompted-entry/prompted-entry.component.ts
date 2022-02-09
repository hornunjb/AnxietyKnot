

//import { NgForm, NgModel } from "@angular/forms";



import { EntryService } from "../entry.service";
import { MatCheckbox } from '@angular/material/checkbox';

// import { format } from 'path';

import { PromptedEntry } from '../prompted-entry';
import { PostsService } from "../posts.service";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncSubject, Subject } from 'rxjs';
import { Post } from '../post.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { timeThursdays } from "d3";



@Component({
  selector: 'app-prompted-entry',
  templateUrl: './prompted-entry.component.html',
  styleUrls: ['./prompted-entry.component.css']
})

export class PromptedEntryComponent implements OnInit{

  enteredTitle= "";

//export class PromptedEntryComponent {
  value = 0;
  ratingCount = 10;
  response = ["Rate your mood?",
    "Really?", "Hang on", "It can be better", "I've been worse", "Not much", "Getting better", "Pretty good", "Lets go", "I feel good", "Yesir"]
//  enteredTitle = "";
//  enteredContent = "";
//  private mode = 'create';
//  private postId: string;
//  public post: Post;
//  public static text: string;

  enteredWhat_happened= "";
  enteredGoing_through_mind= "";
  enteredEmotion1= "";
  enteredIntensity1= "";
  enteredEmotion2= "";
  enteredIntensity2= "";

  enteredThought_patterns= "";
  enteredCustom_thought_patterns= "";
  enteredThinking_differently= "";

  // adding intensity1 property??
  intensity1= 0;
  intensity2= 0;

  private mode = 'create';
  private entryId: string;
  public entry: PromptedEntry;
  public static text: string;


  public intensities: Array<number>= [1,2,3,4,5,6,7,8,9,10];


  openDialog(){
    this.dialogRef.open(PopupComponent);
  }



  // thoughts: FormGroup;
constructor(public entryService: EntryService, public route: ActivatedRoute,
  private dialogRef: MatDialog, fb: FormBuilder) {
    // this.thoughts = fb.group({
    //   C001: this.thoughtsIDs[0],
    //   C002: this.thoughtsIDs[1],
    //   C003: this.thoughtsIDs[2],
    //   C004: this.thoughtsIDs[3],
    //   C005: this.thoughtsIDs[4],
    //   C006: this.thoughtsIDs[5],
    //   C007: this.thoughtsIDs[6],
    //   C008: this.thoughtsIDs[7],
    //   C009: this.thoughtsIDs[8],
    //   C010: this.thoughtsIDs[9],
    //   C011: this.thoughtsIDs[10],
    //   C012: this.thoughtsIDs[11],
    // });

  }

ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('entryId')) {
      this.mode = 'edit';
      this.entryId = paramMap.get('entryId');
      this.entry = this.entryService.getEntry(this.entryId);


      this.entry.thought_patterns.forEach(Element =>{
          this.checkedIDs.push(Element);
           var elem = document.getElementById(Element);
           elem.setAttribute('checked', 'checked');

    })
      console.log(this.checkedIDs)

      this.intensity1 = this.entry.intensity1;
      this.intensity2 = this.entry.intensity2;
      console.log(this.intensity1)

    } else {
      this.mode = 'create';
      this.entryId = null;
    }
  });

}


// thoughtPatterner(form: NgForm){
//   let thoughts[];
//   forEach(MatCheckbox => in thoughts {

//   });}


// thoughtsIDs = [
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
//   false,
// ]



checkedIDs = [];



changeSelection() {
  this.fetchCheckedIDs()
}
// fetchCheckedIDs() {
//   this.checkedIDs = []
//   for (var key in this.thoughtsIDs){
//     if(this.thoughtsIDs[key] = true){
//       this.checkedIDs.push(this.thoughtsIDs[key])
//     }

//   }

//  }
 fetchCheckedIDs() {
  this.checkedIDs = []
  this.checkboxDataList.forEach((value, index) => {
    if(value.checked){
      this.checkedIDs.push(value.id);
    }
  });
}


 checkboxDataList = [
   {
     id: 'C001',
     label: 'All or nothing',
     checked: true,

   },
   {
    id: 'C002',
    label: 'All or nothing',
    checked: true,
  },
  {
    id: 'C003',
    label: 'All or nothing',
    checked: false,
  },
  {
    id: 'C004',
    label: 'All or nothing',
    checked: false,
  },
  {
    id: 'C005',
    label: 'All or nothing',
    checked: false,
  },
  {
    id: 'C006',
    label: 'All or nothing',
    checked: false,
  },
  {
    id: 'C007',
    label: 'All or nothing',
    checked: false,
  },
  {
   id: 'C008',
   label: 'All or nothing',
   checked: false,
 },
 {
   id: 'C009',
   label: 'All or nothing',
   checked: false,
 },
 {
   id: 'C010',
   label: 'All or nothing',
   checked: false,
 },
 {
   id: 'C011',
   label: 'All or nothing',
   checked: false,
 },
 {
   id: 'C012',
   label: 'All or nothing',
   checked: false,
 },
 ]


onSaveEntry(form: NgForm) {
  if (form.invalid) {
    return;
  }
  else if (this.mode === 'create') {
      this.entryService.addEntry(
        form.value.title,
        form.value.what_happened,
        form.value.going_through_mind,
        form.value.emotion1,
        this.intensity1,
        form.value.emotion2,
        this.intensity2,
        this.checkedIDs,
        form.value.custom_thought_patterns,
        form.value.thinking_differently,

        );
    }
    else {
      this.entryService.updateEntry(
        this.entryId,
        form.value.title,
        form.value.what_happened,
        form.value.going_through_mind,
        form.value.emotion1,
        this.intensity1,
        form.value.emotion2,
        this.intensity2,
        this.checkedIDs,
        form.value.custom_thought_patterns,
        form.value.thinking_differently,
        );
    }
    form.resetForm();
  }
}




/*  ngOnInit() {
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
  */





