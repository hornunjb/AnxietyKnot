import { Component, OnInit } from '@angular/core';
import { PromptedEntry } from "../prompted-entry";
import { Post } from "../post.model";

@Component({
  selector: 'app-journal-history',
  templateUrl: './journal-history.component.html',
  styleUrls: ['./journal-history.component.css']
})
export class JournalHistoryComponent implements OnInit{


  ngOnInit(): void {

  }
  
  entries_sort: PromptedEntry[] = [];
  posts_sort: Post[] = [];



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
