import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent, FooterComponent } from './shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent ],
  imports: [
    BrowserModule,
    HomeModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
