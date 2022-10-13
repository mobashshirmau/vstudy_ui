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
    return this._http.post(`${baseUrl}/add/study-material`, data,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  public getAllSubject(data) {
    return this._http.get(`${baseUrl}/study-material/get-subject-list/${data}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  public getAllChapter(cls,subj) {
    return this._http.get(`${baseUrl}/study-material/get-chapter-list/${cls}/${subj}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }
}
