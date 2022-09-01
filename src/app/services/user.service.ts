import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  public fetchUserDetails(regId:any){
    return this.http.get(`${baseUrl}/user/`, regId)
  }
  public getAnswersheet(show_answersheet:any){
    return this.http.post(`${baseUrl}/get/answer-sheet`, show_answersheet)
  }

}
