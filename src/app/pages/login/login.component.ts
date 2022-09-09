import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { MasterService } from 'src/app/services/master.service';

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

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router,
    private _master:MasterService
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    
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
        const role = 'user';
        localStorage.setItem('role',role);
        localStorage.setItem('data',result);
  
      }
      else{
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
      if(this._master.isLoggedIn && localStorage.getItem('role')=='admin'){
        this.router.navigate(["admin"])
      }
      else if(this._master.isLoggedIn && localStorage.getItem('role')=='user'){
        this.router.navigate(['user-dashboard/0']);
      }
  },
);
}
}
