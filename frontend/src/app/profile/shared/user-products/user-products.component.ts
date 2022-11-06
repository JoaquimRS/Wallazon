import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/core';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {

  userProfile!: Profile

  constructor(private aRouter : ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.aRouter.data.subscribe(({userProfile}) => this.userProfile=userProfile)
  }

}
