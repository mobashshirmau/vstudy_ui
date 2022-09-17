import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HeaderAuthenticatorService {

  constructor() {}
  
  createAuthorizationHeader() {
     const jwt_tkn = localStorage.getItem('auth-token')
       const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt_tkn
   });
    return headers
}

}
  
  
