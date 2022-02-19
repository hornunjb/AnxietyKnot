import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journal-history',
  templateUrl: './journal-history.component.html',
  styleUrls: ['./journal-history.component.css']
})
export class JournalHistoryComponent implements OnInit{


  ngOnInit(): void {

  }

  showUnprompted(){
    this.unpromptedVisible = true;
    this.promptedVisible = false;

  }
  showPrompted(){
    this.unpromptedVisible = false;
    this.promptedVisible = true;
  }
  constructor() { }
  unpromptedVisible:boolean = true;
  promptedVisible:boolean = false;


}
