import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

//import { NgForm, NgModel } from "@angular/forms";

import { MatCheckbox } from '@angular/material/checkbox';

import { PostsService } from '../posts.service';


import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DistortionDialogComponent } from '../distortion-dialog/distortion-dialog.component';
import { FeelingsDialogComponent } from '../feelings-dialog/feelings-dialog.component';
import { PopupComponent } from '../popup/popup.component';
import { PromptedEntry } from '../prompted-entry.model';
import { EntryService } from '../entry.service';
import { AuthService } from '../authenticate/auth.service';
import { filter } from 'rxjs/operators';

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
import { DatasetController } from 'chart.js';
import { MatDatepickerContent } from '@angular/material/datepicker';
import { DisplayService } from '../display.service';

const moment = _moment;

@Component({
  selector: 'app-prompted-entry',
  templateUrl: './prompted-entry.component.html',
  styleUrls: ['./prompted-entry.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class PromptedEntryComponent implements OnInit, OnDestroy {
  @Output() newData: EventEmitter<any> = new EventEmitter();
  //get input from parent component
  @Input() editEntryId = ' ';
  ngOnChanges() {
    this.ngOnInit();
  }

  date = new FormControl(moment());
  value = '';
  ratingCount = 10;
  enteredTitle = '';
  enteredContent = '';
  isLoading = false;
  private mode = 'create';
  private entryId: string;
  public entry: PromptedEntry;
  public static text: string;
  private authStatusSub: Subscription;
  public intensities: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  enteredWhat_happened = '';
  enteredGoing_through_mind = '';
  enteredEmotion1 = '';
  enteredIntensity1 = '';
  enteredEmotion2 = '';
  enteredIntensity2 = '';
  enteredThought_patterns = '';
  enteredCustom_thought_patterns = '';
  enteredThinking_differently = '';

  // adding intensity1 property??
  intensity1 = 0;
  intensity2 = 0;

  /* PUBLIC FORM = RE-ENFORCES THAT ALL FIELDS WITHIN THE PAGE MUST BE FILLED..
    ...BEFORE SUBMIT BUTTON BECOMES AVAILABLE but needs FormGroup
*/

  constructor(
    public entryService: EntryService,
    public route: ActivatedRoute,
    private dialogRef: MatDialog,
    private authService: AuthService,
    public displayService: DisplayService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit() {
    // USED TO PREVENT LOADING ISSUES DUE TO FAILURE
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((_authStatus) => {
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('entryId') || this.editEntryId != ' ') {
        this.mode = 'edit';
        // this.entryId = paramMap.get('entryId');
        if (this.editEntryId != ' ') {
          this.entryId = this.editEntryId;
        } else {
          this.entryId = paramMap.get('entryId');
        }
        this.isLoading = true;
        this.entryService.getEntry(this.entryId).subscribe((entryData) => {
          this.isLoading = false;
          this.entry = {
            id: entryData._id,
            date: entryData.date,
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
            creator: entryData.creator,
            mood: entryData.mood,
          };
          this.entry.thought_patterns.forEach((Element) => {
            this.checkedIDs.push(Element);
            var elem = document.getElementById(Element);
            elem.setAttribute('checked', 'checked');
          });
          //  console.log(this.checkedIDs)
          this.intensity1 = this.entry.intensity1;
          this.intensity2 = this.entry.intensity2;
          //    console.log(this.intensity1)
        });
      } else {
        this.mode = 'create';
        this.entryId = null;
      }
    });
  }

  async openDialog() {
    const dialogRef = this.dialogRef.open(PopupComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.value = result;

    });
    await dialogRef.afterClosed().toPromise();
    let date = this.date.value.toDate();

    this.isLoading = true;
    if (this.mode === 'create') {
      this.entryService.addEntry(
        date,
        this.enteredTitle,
        this.enteredWhat_happened,
        this.enteredGoing_through_mind,
        this.enteredEmotion1,
        this.intensity1,
        this.enteredEmotion2,
        this.intensity2,
        this.checkedIDs,
        this.enteredCustom_thought_patterns,
        this.enteredThinking_differently,
        this.value
      );
    } else {
      this.entryService.updateEntry(
        this.entryId,
        date,
        this.enteredTitle,
        this.enteredWhat_happened,
        this.enteredGoing_through_mind,
        this.enteredEmotion1,
        this.intensity1,
        this.enteredEmotion2,
        this.intensity2,
        this.checkedIDs,
        this.enteredCustom_thought_patterns,
        this.enteredThinking_differently,
        this.value
      );
    }
    window.location.reload();

    this.newData.emit();
  }
  openDistortionDialog() {
    if (this.dialogRef.openDialogs.length == 0) {
      this.dialogRef.open(DistortionDialogComponent, {
        disableClose: false,
      });
    }
  }
  openFeelingsDialog() {
    if (this.dialogRef.openDialogs.length == 0) {
      this.dialogRef.open(FeelingsDialogComponent, {
        disableClose: false,
      });
    }
  }

  checkedIDs = [];

  changeSelection() {
    this.fetchCheckedIDs();
  }

  fetchCheckedIDs() {
    this.checkedIDs = [];
    document.getElementsByName('thought_patterns').forEach((Element) => {
      var elem = document.getElementById(Element.id) as HTMLInputElement;
      if (elem.checked) {
        this.checkedIDs.push(Element.id);
      }
    });
  }

  onSaveEntry(form: NgForm) {
    this.enteredTitle = form.value.title;
    this.enteredWhat_happened = form.value.what_happened;
    this.enteredGoing_through_mind = form.value.going_through_mind;
    this.enteredEmotion1 = form.value.emotion1;

    this.enteredEmotion2 = form.value.emotion2;
    this.enteredCustom_thought_patterns = form.value.custom_thought_patterns;
    this.enteredThinking_differently = form.value.thinking_differently;

    // openDialog redirects user back to entry-list page after entry create, edit or delete
    this.openDialog();
    // form.resetForm();



  }

  // USED TO PREVENT LOADING ISSUES DUE TO FAILURE
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
