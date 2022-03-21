import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Router } from "@angular/router";

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

  constructor(private router: Router) { }


  ngOnInit(): void {
    //reloads current page user is currently on
    //window.location.reload();
  }
  reloadComponent() {
    //refreshes webpage after edit popup submission or redirects user after creation
    this.router.navigate(['/journalDisplay'])
    //.then(() => {

      // WORKS WITH EDIT AND DELTE IN JOURNAL DISPLAY DOES NOT WORK WITH CREATE
      //window.location.reload();


      /*let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]); */
   // });
 // });
}
}
