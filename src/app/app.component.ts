import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderAuthenticatorService } from './services/header-authenticator.service';
import baseUrl from './services/helper';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private _http: HttpClient, private _headerAuth: HeaderAuthenticatorService, private router: Router, private snack: MatSnackBar,

    ){}
 checkIfUserSessionIsValid(){
  this._http.get(`${baseUrl}/session/if-valid`,{headers: this._headerAuth.createAuthorizationHeader()}).subscribe(
    (result: any) => {
    return  
    },
    (error: any) => {
      
      if (error.status==403){
        localStorage.clear()
        this.snack.open('Session expired', '', {
          duration: 3000,
        });
        this.router.navigate(['login']);
        

      }
    }
  )
 }
 ngOnInit(): void {
  this.checkIfUserSessionIsValid()
}
 
}
