import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderAuthenticatorService } from './header-authenticator.service';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient, private _headerAuth: HeaderAuthenticatorService) {}

  //load all the cateogries

  // public categories(jwt_tkn) {
  //   var reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + jwt_tkn
  //  });
  // public catf(){
    
  // }
  public categories() {
  // var headers = this._headerAuth.createAuthorizationHeader()

  return this._http.get(`${baseUrl}/category/`,{headers: this._headerAuth.createAuthorizationHeader()});

  }


  //add new category
  public addCategory(category) {
    return this._http.post(`${baseUrl}/add/category/`,category, {headers: this._headerAuth.createAuthorizationHeader()});
  }
}



    