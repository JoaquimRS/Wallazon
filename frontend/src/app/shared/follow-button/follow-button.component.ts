import { Component, Input, OnInit } from '@angular/core';
import { Profile, UserService } from 'src/app/core';

@Component({
  selector: 'follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  @Input() userProfile!: Profile

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  changeFollow(follow: boolean) {
    this.userProfile.userFollow = follow
    this._userService.changeFollow(this.userProfile.username).subscribe()
    
  }


}
