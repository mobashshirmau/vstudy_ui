import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderAuthenticatorService } from './header-authenticator.service';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  // 
  constructor(private _http: HttpClient, private _headerAuth:HeaderAuthenticatorService) {}
  //load all the cateogries
  public levels() {
    return this._http.get(`${baseUrl}/level/`,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //add new category
  public addLevel(level) {
    return this._http.post(`${baseUrl}/add/level/`, level,{headers: this._headerAuth.createAuthorizationHeader()});
  }
}