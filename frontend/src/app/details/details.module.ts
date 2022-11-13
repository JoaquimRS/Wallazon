import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing.module';
import { SharedModule } from '../shared';
import { CoreModule } from '../core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsComponent } from './details.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    DetailsRoutingModule,
    SharedModule,
    CoreModule,
    FontAwesomeModule
  ]
})
export class DetailsModule { }
