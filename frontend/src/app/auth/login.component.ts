import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { environment } from 'src/environments/environment';
import { User, userInfo, AuthService, UserService } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  password: string = '';
  userInfo!: userInfo
  user_error: string = ""
  password_error: string = ""
  
  constructor(
    private fb:FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) { 
    this.loginForm = this.fb.group({
      user: ['',Validators.required],
      password: ['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    let check = true
    let username, password
    this.loginForm.get("user")?.valid ? (username = this.loginForm.get("user")?.value, this.user_error="") : (check=false,this.user_error="*Usuario requerido")
    this.loginForm.get("password")?.valid ? (password = this.loginForm.get("password")?.value, this.password_error="") : (check=false,this.password_error="*Contraseña no valida")    
    password = CryptoJS.AES.encrypt(password,environment.secret).toString()
    check ? this.submitLogin({username,password}) : null    
  }  
  async submitLogin(userInfo: userInfo) {    
    this._authService.login(userInfo)
    .subscribe((user)=>{      
      if (Object.keys(user).length) {
        this._userService.saveUser(user)
        this.router.navigate(['/'])        
      } else {
        this.user_error = "*Usuario o contraseña incorrectos"
      }      
    })
  }

  deleteUser() {
    this._userService.deleteUser()
  }
}
