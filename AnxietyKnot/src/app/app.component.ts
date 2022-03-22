import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";
//import { PromptedEntry } from "./prompted-entry";
import { AuthService } from './authenticate/auth.service';
import { Subject, Subscription } from "rxjs";
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/* ALL INITIAL CODE THAT WAS IN HERE IS NOW MOVED TO POSTS.SERVICE.TS*/

export class AppComponent implements OnInit{

  title = 'AnxietyKnot';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
