import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/core';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.css']
})
export class UserFollowingComponent implements OnInit {

  userProfile!: Profile

  constructor(private aRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRouter.data.subscribe(({userProfile}) => this.userProfile=userProfile)    
  }

}
