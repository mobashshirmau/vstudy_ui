import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderAuthenticatorService } from './header-authenticator.service';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient,private _headerAuth:HeaderAuthenticatorService) {}

  //add user

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user,{headers: this._headerAuth.createAuthorizationHeader()})
  }

  public fetchUserDetails(regId:any){
    return this.http.get(`${baseUrl}/user/`+regId, {headers: this._headerAuth.createAuthorizationHeader()})
  }
  public getAnswersheet(show_answersheet:any){
    return this.http.post(`${baseUrl}/get/answer-sheet`, show_answersheet,{headers: this._headerAuth.createAuthorizationHeader()})
  }
  // insecure endpoint
  public checkIfUserExist(data:any){
    return this.http.post(`${baseUrl}/user/is-exist`, data)
  }
  public uploadUser(file:any){
    return this.http.post(`${baseUrl}/action/bulk/upload`, file,{headers: this._headerAuth.createAuthorizationHeader()})
  }
  public uploadContent(data:any){
    return this.http.post(`${baseUrl}/action/upload/content`, data)
  }

}
