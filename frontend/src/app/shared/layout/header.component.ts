import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user:boolean = false
  currentUser!: User

  constructor(
    private _userService : UserService,
    private router : Router
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

  toProfile() {
    this.router.navigateByUrl('/profile',{skipLocationChange: true}).then(()=>{this.router.navigate([`/profile/${this.currentUser.username}`])})
  }

  toLikes() {
    this.router.navigateByUrl('/profile',{skipLocationChange: true}).then(()=>{this.router.navigate([`/profile/${this.currentUser.username}/likes`])})
  }

  toComments() {
    this.router.navigateByUrl('/profile',{skipLocationChange: true}).then(()=>{this.router.navigate([`/profile/${this.currentUser.username}/comments`])})
  }


}
