import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Comment, CommentsService, Product, User, UserService } from 'src/app/core';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  newComment: boolean = false
  comment: string = ""
  @Input() comments!: any[]
  @Input() product?: Product
  @Input() index!: string
  currentUser!: User
  comment_error: string = ""

  constructor(
    private _userService: UserService,
    private _commentService: CommentsService,
  ) {
    // this.product = this.aRouterSnap.paramMap.get('slugProduct')
  }

  ngOnInit(): void {    
    this._userService.currentUser.subscribe(data => this.currentUser = data)
    
  }

  saveComment() {        
    if (this.comment.length > 0 && this.comment.length < 300) {
      this._commentService.addProduct({slug_product:this.product?.slug,body:this.comment}).subscribe()
      let newComment = {user:this.currentUser, body:this.comment, product:this.product}      
      this.comments.push(newComment)
      this.newComment=false
      this.comment = ""  
      this.comment_error = ""
    } else {
      this.comment_error = "Comentario no valido"
    }


    
  }

}
