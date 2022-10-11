import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";


import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared';



@NgModule({
  imports: [
    HomeRoutingModule,
    FontAwesomeModule,
    BrowserModule,
    SharedModule,
    InfiniteScrollModule

  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }

platformBrowserDynamic().bootstrapModule(HomeModule);
