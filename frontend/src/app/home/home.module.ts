import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from "ngx-infinite-scroll";


import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    FontAwesomeModule,
    BrowserModule,
    SharedModule,
    InfiniteScrollModule

  ],
})
export class HomeModule { }

// platformBrowserDynamic().bootstrapModule(HomeModule);
