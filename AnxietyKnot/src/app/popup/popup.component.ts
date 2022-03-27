import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Output() moodValue = new EventEmitter<string>();

  value = 0;
  ratingCount = 5;
  response = ["How're you feeling?",
    "Very Sad", "Somewhat Sad", "Neutral", "Somewhat Happy", "Very Happy!"];

  ngOnInit(): void {
  }

  constructor(
    private dialogRef: MatDialogRef<PopupComponent>
  ) {}

  sendRating() {
    this.dialogRef.close(this.value);
  }



}
