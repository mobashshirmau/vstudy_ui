import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderAuthenticatorService } from './header-authenticator.service';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class StudyMaterialService {

  constructor(private _http: HttpClient, private _headerAuth: HeaderAuthenticatorService) { }

  //add question
  public addStudyMaterial(data) {
    console.log(data)
    return this._http.post(`${baseUrl}/add/study-material`, data,{headers: this._headerAuth.createAuthorizationHeader()});
  }
}
