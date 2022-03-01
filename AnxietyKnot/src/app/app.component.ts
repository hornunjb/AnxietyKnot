import { Component, OnInit } from '@angular/core';
import { AuthService } from './authenticate/auth.service';

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
