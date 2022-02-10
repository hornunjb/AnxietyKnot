

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




constructor(public entryService: EntryService, public route: ActivatedRoute,
  private dialogRef: MatDialog, fb: FormBuilder) {


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






checkedIDs = [];



changeSelection() {
  this.fetchCheckedIDs()
}


fetchCheckedIDs() {
  this.checkedIDs = []
  document.getElementsByName("thought_patterns").forEach(Element =>{
    var elem = document.getElementById(Element.id) as HTMLInputElement;
    if(elem.checked){
      this.checkedIDs.push(Element.id)
    }
  })

}





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










