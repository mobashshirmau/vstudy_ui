import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderAuthenticatorService } from './header-authenticator.service';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private _http: HttpClient, private _headerAuth:HeaderAuthenticatorService) {}
  //load all the cateogries
  public subjects() {
    return this._http.get(`${baseUrl}/subject/`,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //add new category
  public addSubject(subject) {
    return this._http.post(`${baseUrl}/add/subject/`, subject,{headers: this._headerAuth.createAuthorizationHeader()});
  }
}