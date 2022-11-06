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
        resolve: { userProfile : ProfileResolver },
        
      },
      {
        path: 'likes',
        component: UserLikesComponent,
        resolve: { userProfile : ProfileResolver },
        canActivate: [ProfileGuard]
        
      },
      {
        path: 'products',
        component: UserProductsComponent,
        resolve: { userProfile : ProfileResolver },
      },
      
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
