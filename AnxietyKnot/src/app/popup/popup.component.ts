import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {


  value = 0;
  ratingCount = 5;
  response = ["How're you feeling?",
    "Very Sad", "Somewhat Sad", "Neutral", "Somewhat Happy", "Very Happy!"];

  constructor() { }


  ngOnInit(): void {
  }

}
