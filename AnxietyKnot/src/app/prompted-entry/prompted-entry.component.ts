
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

import { PromptedEntry } from '../prompted-entry';
import { EntryService } from "../entry.service";
import { AuthService } from "../auth/auth.service";



@Component({
  selector: 'app-prompted-entry',
  templateUrl: './prompted-entry.component.html',
  styleUrls: ['./prompted-entry.component.css']
})
export class PromptedEntryComponent implements OnInit, OnDestroy{

  value = 0;
  ratingCount = 10;
  enteredTitle= "";
  isLoading = false;
  private mode = 'create';
  private entryId: string;
  public entry: PromptedEntry;
  public static text: string;
  private authStatusSub: Subscription;
  public intensities: Array<number>= [1,2,3,4,5,6,7,8,9,10];

  response = ["Rate your mood?",
    "Really?", "Hang on", "It can be better", "I've been worse", "Not much", "Getting better", "Pretty good", "Lets go", "I feel good", "Yesir"]


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


/* PUBLIC FORM = ENFORCES THAT ALL FIELDS WITHIN THE PAGE MUST BE FILLED..
    ...BEFORE SUBMIT BUTTON BECOMES AVAILABLE but needs FormGroup
*/
 // public form = new FormGroup(
   // {
   // title: new FormControl("", Validators.required)
 // });

  openDialog(){
    this.dialogRef.open(PopupComponent);
  }

  constructor(
    public entryService: EntryService,
    public route: ActivatedRoute,
    private dialogRef: MatDialog,
    private authService: AuthService,
    ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(_authStatus => {
        this.isLoading = false;
      });
    /// this.entry IS UNDEFINED ERROR LINE 81
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('entryId')) {
        this.mode = 'edit';
        this.entryId = paramMap.get('entryId');
        this.isLoading = true;
        this.entryService.getEntry(this.entryId).subscribe(entryData => {
          this.isLoading = false;
          this.entry = {
            id: entryData._id,
            title: entryData.title,
            what_happened: entryData.what_happened,
            going_through_mind: entryData.going_through_mind,
            emotion1: entryData.emotion1,
            intensity1: entryData.intensity1,
            emotion2: entryData.emotion2,
            intensity2: entryData.intensity2,
            thought_patterns: entryData.thought_patterns,
            custom_thought_patterns: entryData.custom_thought_patterns,
            thinking_differently: entryData.thinking_differently,
            creator: entryData.creator
          };


      //  console.log(this.checkedIDs)
      //  this.intensity1 = this.entry.intensity1;
      //  this.intensity2 = this.entry.intensity2;
      //  console.log(this.intensity1)
          });
      } else {
        this.mode = 'create';
        this.entryId = null;
      }
    })
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
    this.openDialog();
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create')
     {
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
    } else {
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
  // USED TO PREVENT LOADING ISSUES DUE TO FAILURE
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
