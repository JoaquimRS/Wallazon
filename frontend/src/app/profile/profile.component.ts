import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '../core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  userProfile: string | null
  currentUser!: User


  constructor(
    private aRouter : ActivatedRoute,
    private _userService : UserService
  ) { 
    this.userProfile = this.aRouter.snapshot.paramMap.get('userProfile')
  }
  
  ngOnInit(): void {
    this._userService.currentUser.subscribe((currentUser) => this.currentUser=currentUser)    
  }

  logout() {
    this._userService.deleteUser()
  }

}
