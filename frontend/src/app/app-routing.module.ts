import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path:'shop', 
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes,{
    preloadingStrategy: QuicklinkStrategy,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
