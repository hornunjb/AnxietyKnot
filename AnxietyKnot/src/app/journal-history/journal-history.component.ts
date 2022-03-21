import { Component, OnInit } from '@angular/core';
//import { PromptedEntry } from "../prompted-entry";
import { Post } from "../post.model";

@Component({
  selector: 'app-journal-history',
  templateUrl: './journal-history.component.html',
  styleUrls: ['./journal-history.component.css']
})
export class JournalHistoryComponent{

/* JOURNAL BOOK AND PROMPTED PAGE POSTS ARE ALWAYS SHOWING BUT THESE FUNCTION AS A VALUE TO TEMPORARILY HIDE OR SHOW WHEN CLICKED
THEESE INFORMATION FOR THE UNPROMPTED AND PROMPTED PAGES ALWAYS SHOW, BUT THESE FUNCTIONS ENSURE THE PROMPTS/UNPROMPT WILL SHOW OR NOT */

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
interface IJournals{
    type: string;
    title: string;
    id: string;
}
