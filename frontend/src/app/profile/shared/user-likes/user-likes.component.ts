import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/core';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.css']
})
export class UserLikesComponent implements OnInit {

  userProfile!: Profile

  constructor(private aRouter : ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.aRouter.parent?.data.subscribe(({userProfile}) => this.userProfile=userProfile)
  }

}
