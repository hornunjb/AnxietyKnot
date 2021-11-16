import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncSubject, Subject } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.css']
})
export class NewEditComponent implements OnInit {

  enteredTitle = "";
  enteredContent = "";
  private mode = 'create';
  private postId: string;
  public post: Post;
  public static text: string;

  private editorSubject: Subject<any> = new AsyncSubject();
  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
  });

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }


    onSubmit() {
      if (this.myForm.invalid) {
        return;
      }
      if (this.mode === 'create') {
        this.postsService.addPost(this.myForm.value['title'], this.myForm.value['body']);
      }
      else {
        this.postsService.updatePost(this.postId, this.myForm.value['title'], this.myForm.value['body']);
      }
    }

}
