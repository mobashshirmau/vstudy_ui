import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToolbarComponent } from 'src/app/components/navbar/toolbar/toolbar.component';

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
  someSubscription: any;

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router,
    private _master:MasterService
  ) {}

  ngOnInit(): void {

    if(this._master.isLoggedIn &&  localStorage.getItem('role')=='user'){
        this.router.navigate(['user-dashboard/0'])
    }
    if(this._master.isLoggedIn &&  localStorage.getItem('role')=='admin'){
      this.router.navigate(['admin'])
  }
  }

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
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
        this.someSubscription = this.router.events.subscribe((event) => {
          if (event instanceof ToolbarComponent) {
            // Here is the dashing line comes in the picture.
            // You need to tell the router that, you didn't visit or load the page previously, so mark the navigated flag to false as below.
            this.router.navigated = false;
          }
        });
        const role = 'user';
        localStorage.setItem('role',role);
        localStorage.setItem('stu_id',result.data[0]['regId']);
  
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
