import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [
    AuthRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule

  ]
})
export class AuthModule { }
