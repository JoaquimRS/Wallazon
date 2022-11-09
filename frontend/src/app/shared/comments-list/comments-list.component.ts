import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  newComment: boolean = false
  comment!: String
  constructor() { }

  ngOnInit(): void {
  }

  addComment() {
    this.newComment = true
  }

  saveComment() {    
    console.log(this.comment);
    
  }

}
