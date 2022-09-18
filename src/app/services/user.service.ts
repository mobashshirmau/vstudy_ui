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
  public checkIfUserExist(data:any){
    return this.http.post(`${baseUrl}/user/is-exist`, data)
  }
  public uploadUser(file:any){
    return this.http.post(`${baseUrl}/action/bulk/upload`, file)
  }
  public uploadContent(data:any){
    return this.http.post(`${baseUrl}/action/upload/content`, data)
  }

}
