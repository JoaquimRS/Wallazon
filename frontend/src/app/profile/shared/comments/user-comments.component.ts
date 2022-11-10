import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, CommentsService, Profile } from 'src/app/core';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent implements OnInit {

  comments!: Comment[]
  userProfile!: Profile

  constructor(
    private _commentService: CommentsService,
    private aRouter: ActivatedRoute
  ) { 
    this._commentService.getUser().subscribe(data=>this.comments = data)
    this.aRouter.data.subscribe(({userProfile}) => this.userProfile=userProfile)
  }

  ngOnInit(): void {
    
  }

}
