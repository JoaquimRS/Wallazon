import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  user:boolean = false

  constructor(
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.user = isAuthenticated
      }
    )
  }

}
