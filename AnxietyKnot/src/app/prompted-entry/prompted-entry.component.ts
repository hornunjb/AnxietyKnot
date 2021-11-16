import { Component} from '@angular/core';
import { NgForm } from "@angular/forms";
import { PromptedEntry } from '../prompted-entry';

import { PostsService } from "../posts.service";


@Component({
  selector: 'app-prompted-entry',
  templateUrl: './prompted-entry.component.html',
  styleUrls: ['./prompted-entry.component.css']
})
export class PromptedEntryComponent {
private prompted_entries: PromptedEntry[] = [
];
public intensities: Array<number>= [1,2,3,4,5,6,7,8,9,10];



constructor() {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }


    form.resetForm();
  }
}
