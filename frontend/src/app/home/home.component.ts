import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../core';
import { Category } from '../core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[] = []

  constructor(
    // private activateRoute: ActivatedRoute,
    private categoriService: CategoriesService
  ) { 
    this.categoriService.allCategories()
      .subscribe((categories)=>{
        this.categories = categories
      })
    
  }
  
  ngOnInit(): void {
    
    // this.activateRoute.data.subscribe((data) =>{
    //   this.msg = data
    // }) 
  }

}
