import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user:boolean = false
  currentUser!: User

  constructor(
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.user=isAuthenticated
    })
    
    this._userService.currentUser.subscribe(
      (currentUser) => {
        this.currentUser = currentUser
    })
  }

}
