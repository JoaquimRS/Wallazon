import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '../core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[] = []

  constructor(

    private categoriService: CategoriesService
  ) { 
    this.categoriService.allCategories()
      .subscribe((categories)=>{
        this.categories = categories
      })
    
  }
  
  ngOnInit(): void {
  }

}
