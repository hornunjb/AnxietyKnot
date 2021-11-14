import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import 'quill-emoji/dist/quill-emoji.js'
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  //var for rating bar 
  value = 0;
  ratingCount = 10;
  response = ["Rate your mood?",
    "Really?", "Hang on", "It can be better", "I've been worse", "Not much", "Getting better", "Pretty good", "Lets go", "I feel good", "Yesir"]

  //var for quill editor
  blured = false
  focused = false
  editorText = '';

  constructor(private dialogRef: MatDialog){}
  
  openDialog(){
    this.dialogRef.open(PopupComponent);
  }

  created(event: any) {
    console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log('editor got changed', event);
    this.editorText = event['editor']['root']['innerHTML'];
  }

  focus($event: any) {
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event: any) {
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }

  editorModule = {
    'emoji-shortname': true,
    'emoji-textarea': false,
    'emoji-toolbar': true,
    'toolbar': {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video'],                         // link and image, video
        ['emoji'],
      ],
      handlers: { 'emoji': function () { } }
    }
  }
}


