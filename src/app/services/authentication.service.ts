import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HeaderAuthenticatorService } from './header-authenticator.service';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient, private _headerAuth:HeaderAuthenticatorService,
    private snack: MatSnackBar,
    private router: Router,
    ) {}

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
}
