import { Component, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PromptedEntry } from '../prompted-entry';

import { EntryService } from "../entry.service";
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-prompted-entry',
  templateUrl: './prompted-entry.component.html',
  styleUrls: ['./prompted-entry.component.css']
})
export class PromptedEntryComponent implements OnInit{

  enteredTitle= "";
  enteredWhat_happened= "";
  enteredGoing_through_mind= "";
  enteredEmotion1= "";
  enteredIntensity1= "";
  enteredEmotion2= "";
  enteredIntensity2= "";

  enteredThought_patterns= "";
  enteredCustom_thought_patterns= "";
  enteredThinking_differently= "";


  private mode = 'create';
  private entryId: string;
  public entry: PromptedEntry;
  public static text: string;


  public intensities: Array<number>= [1,2,3,4,5,6,7,8,9,10];



constructor(public entryService: EntryService, public route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('entryId')) {
      this.mode = 'edit';
      this.entryId = paramMap.get('entryId');
      this.entry = this.entryService.getEntry(this.entryId);
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
checkedIDs = [];

changeSelection() {
  this.fetchCheckedIDs()
}
fetchCheckedIDs() {
  this.checkedIDs = []
  this.checkboxDataList.forEach((value, index) => {
    if(value.isChecked){
      this.checkedIDs.push(value.id);
    }
  });
}


 checkboxDataList = [
   {
     id: 'C001',
     label: 'All or nothing',
     isChecked: false,
   },
   {
    id: 'C002',
    label: 'All or nothing',
    isChecked: false,
  },
  {
    id: 'C003',
    label: 'All or nothing',
    isChecked: false,
  },
  {
    id: 'C004',
    label: 'All or nothing',
    isChecked: false,
  },
  {
    id: 'C005',
    label: 'All or nothing',
    isChecked: false,
  },
  {
    id: 'C006',
    label: 'All or nothing',
    isChecked: false,
  },
  {
    id: 'C007',
    label: 'All or nothing',
    isChecked: false,
  },
  {
   id: 'C008',
   label: 'All or nothing',
   isChecked: false,
 },
 {
   id: 'C009',
   label: 'All or nothing',
   isChecked: false,
 },
 {
   id: 'C010',
   label: 'All or nothing',
   isChecked: false,
 },
 {
   id: 'C011',
   label: 'All or nothing',
   isChecked: false,
 },
 {
   id: 'C012',
   label: 'All or nothing',
   isChecked: false,
 },
 ]


onSaveEntry(form: NgForm) {
  if (form.invalid) {
    return;
  }




  if (this.mode === 'create') {
    this.entryService.addEntry(
      form.value.title,
      form.value.what_happened,
      form.value.going_through_mind,
      form.value.emotion1,
      Number(form.value.intensity1),
      form.value.emotion2,
      Number(form.value.intensity2),
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
      form.value.intensity1,
      form.value.emotion2,
      form.value.intensity2,
      this.checkedIDs,
      form.value.custom_thought_patterns,
      form.value.thinking_differently,
      );
  }
  form.resetForm();
}
}
