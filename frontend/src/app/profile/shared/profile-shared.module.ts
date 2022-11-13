import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core';
import { SharedModule } from 'src/app/shared';
import { UserLikesComponent } from './likes/user-likes.component';
import { UserProductsComponent } from './products/user-products.component';
import { UserProfileComponent } from './profile/user-profile.component';
import { UserFollowingComponent } from './following/user-following.component';
import { RouterModule } from '@angular/router';
import { UserCommentsComponent } from './comments/user-comments.component';




@NgModule({
  declarations: [
    UserLikesComponent,
    UserProductsComponent,
    UserProfileComponent,
    UserFollowingComponent,
    UserCommentsComponent
  ],
  imports: [
    FontAwesomeModule,
    CoreModule,
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    UserLikesComponent,
    UserProductsComponent,
    UserProfileComponent,
    UserFollowingComponent,
    UserCommentsComponent
  ]
})
export class ProfileSharedModule { }
