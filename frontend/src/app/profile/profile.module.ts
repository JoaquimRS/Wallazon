import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileSharedModule } from './shared';
import { CoreModule } from '../core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    ProfileSharedModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    CoreModule,
    SharedModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
