import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core';
import { SharedModule } from 'src/app/shared';
import { UserLikesComponent } from './user-likes/user-likes.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { UserProfileComponent } from './user-profile/user-profile.component';




@NgModule({
  declarations: [
    UserLikesComponent,
    UserProductsComponent,
    UserProfileComponent
  ],
  imports: [
    FontAwesomeModule,
    CoreModule,
    SharedModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    UserLikesComponent,
    UserProductsComponent,
    UserProfileComponent
  ]
})
export class ProfileSharedModule { }
