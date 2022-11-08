import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, User, UserService } from 'src/app/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile!: Profile
  currentUser! : User
  sameUser!: boolean
  email? : string
  bio : string = ""
  avatar: string = ""
  img? : string

  constructor(
    private aRouter : ActivatedRoute,
    private _userService: UserService
    ) {
  }
  
  ngOnInit(): void {
    this.aRouter.data.subscribe(({userProfile}) => this.userProfile=userProfile)    
    this.email = this.userProfile.email
    this.bio = this.userProfile.bio
    this.avatar = this.userProfile.avatar
    this._userService.currentUser.subscribe((currentUser)=>{
      this.currentUser = currentUser
      this.sameUser = this.userProfile.username == this.currentUser.username
    })
  }

  updateProfile() {    
    this.userProfile.email = this.email
    this.userProfile.bio = this.bio
    this.userProfile.avatar = this.avatar
    
    this._userService.setUserProfile(this.userProfile)
    .subscribe((data)=>{
      this.userProfile = data.user
    })
  }

  selectFile(event: any): void {
    this._userService.updateUserImage(event.target.files)
    .subscribe(data => {
      this.avatar = data
      this.updateProfile()
    })    
  }

}
