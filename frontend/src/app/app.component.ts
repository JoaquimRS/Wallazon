import { Component, OnInit } from '@angular/core';
import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Wallazon';
  constructor(
    private _userService : UserService
  ) {
  }
  ngOnInit() {
    this._userService.populate();
  }
  
}
