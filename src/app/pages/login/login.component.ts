import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToolbarComponent } from 'src/app/components/navbar/toolbar/toolbar.component';

import { LoginService } from 'src/app/services/login.service';
import { MasterService } from 'src/app/services/master.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true
  loginData = {
    regId: '',
    password: '',
  };
  loginDataBackend={
    regId:'',
    password:'',
  }
  someSubscription: any; 
  password: string;

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router,
    private _master:MasterService
  ) {}

  ngOnInit(): void {

    if(this._master.isLoggedIn &&  localStorage.getItem('role')=='student'){
        this.router.navigate(['user-dashboard/0'])
    }
    if(this._master.isLoggedIn &&  localStorage.getItem('role')=='admin'){
      this.router.navigate(['admin/welcome'])
  }
  }

  formSubmit() {
    this.login.checkIfSecureLoginEnabled().subscribe(
      (result: any) => { 
       if(result==true){
        this.password=Md5.hashStr(this.loginData.password)
        console.log("passwoed  enc"+this.loginData.password)
       }
       this.loginDataBackend['regId'] = this.loginData.regId
       this.loginDataBackend['password'] = this.password
       console.log(this.loginData);
     
    if (
      this.loginData.regId.trim() == '' ||
      this.loginData.regId == null
    ) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (result: any) => {
      if(result.status=='success'){
        const role = result.data[0]['role'];
        localStorage.setItem('auth-token',result.authentication_token);
        localStorage.setItem('role',role);
        localStorage.setItem('stu_id',result.data[0]['regId']);
  
      }
      else{
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
      if(this._master.isLoggedIn && localStorage.getItem('role')=='admin'){
        this.router.navigate(['admin/welcome'])
        
      }
      else if(this._master.isLoggedIn && localStorage.getItem('role')=='student'){
        this.router.navigate(['user-dashboard/0']);
      }
  },
); });
} 
}
