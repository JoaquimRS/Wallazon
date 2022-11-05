import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, ProfileGuard } from '../core';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile.resolver';
import { UserLikesComponent } from './shared/user-likes/user-likes.component';
import { UserProductsComponent } from './shared/user-products/user-products.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';


const routes : Routes = [
  {
    path:':userProfile',
    component: ProfileComponent,
    resolve: { userProfile : ProfileResolver },
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        
      },
      {
        path: 'likes',
        component: UserLikesComponent,
        canActivate: [ProfileGuard]
        
      },
      {
        path: 'products',
        component: UserProductsComponent
      },
      
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
