import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { userInfo } from '../core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  user_error: string = ""
  email_error: string = ""
  password_error: string = ""
  repassword_error : string = ""


  constructor(
    private fb: FormBuilder,
    private _authService: AuthService
  ) { 
    this.registerForm = this.fb.group({
      user: ['',Validators.required],
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      repassword: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  register() {    
    let check = true
    let username, email, password, repassword
    

    this.registerForm.get("user")?.valid ? (username = this.registerForm.get("user")?.value,this.user_error = "") : (check=false,this.user_error="*Usuario requerido")
    this.registerForm.get("email")?.valid ? (email = this.registerForm.get("email")?.value,this.email_error = "") : (check=false,this.email_error="*Email no valido")
    this.registerForm.get("password")?.valid ? (password = this.registerForm.get("password")?.value,this.password_error = "") : (check=false,this.password_error="*Contraseña poco robusta")
    this.registerForm.get("repassword")?.valid ? (repassword = this.registerForm.get("repassword")?.value,this.repassword_error = "") : (check=false,this.repassword_error="*Repetir contraseña no valida")
    
    if (check) {
      repassword == password ? this.repassword_error="" : (check=false, this.repassword_error="*Contraseñas no coinciden")  
    }
    
    password = CryptoJS.AES.encrypt(password,environment.secret).toString()
    check ? this.submitRegister({username,password,email}) : null
    
  }

  async submitRegister(userInfo: userInfo) {
    this._authService.register(userInfo)
    .subscribe((user)=>{
      console.log(user);
      
    })
  }

}
