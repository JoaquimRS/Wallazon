import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details.component';
import { DetailsResolver } from './detatils.resolver';


const routes : Routes = [
  {
    path:':slugProduct',
    component: DetailsComponent,
    resolve: {product: DetailsResolver}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
