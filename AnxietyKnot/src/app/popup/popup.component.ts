import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  Router} from '@angular/router';


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
    private dialogRef: MatDialogRef<PopupComponent>,
    private router: Router,

  ) {}

  sendRating() {
   this.dialogRef.close(this.value);
  // this.router.navigate(['/journalDisplay']);


}

/*  reloadComponent() {
    //refreshes webpage after edit popup submission or redirects user after creation

    ---USE THIS:  this.router.navigate(['/journalDisplay']); // works with create but not edit
    //.then(() => {

      // WORKS WITH EDIT AND DELTE IN JOURNAL DISPLAY DOES NOT WORK WITH CREATE// causes error on create
      //window.location.reload();


      /*let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]); */
   // });
 // }); */

}
