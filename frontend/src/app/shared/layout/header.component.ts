import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user:boolean = false

  constructor(
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.user=isAuthenticated
        
      }
    )
    
  }

}
