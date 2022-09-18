import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderAuthenticatorService } from './header-authenticator.service';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient,private _headerAuth:HeaderAuthenticatorService) {}

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //add quiz
  public addQuiz(quiz) {
    return this._http.post(`${baseUrl}/add/quiz/`, quiz,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //delete quiz
  public deleteQuiz(qId) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //get the single quiz

  public getQuiz(qId) {
    return this._http.get(`${baseUrl}/quiz/${qId}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //update quiz
  public updateQuiz(quiz) {
    return this._http.put(`${baseUrl}/quiz/`, quiz,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //get quizzes of category
  public getQuizzesOfCategory(cid) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }
  //qet active quizzes
  public getActiveQuizzes(stu_id) {
    return this._http.get(`${baseUrl}/quiz/active/${stu_id}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid) {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }
  public getQuizStartTimeForAStudent(data){
    return this._http.post(`${baseUrl}/ans/get-quiz-start-time`,data,{headers: this._headerAuth.createAuthorizationHeader()});
  }
  public getRanking(qid){
    return this._http.get(`${baseUrl}/result/get-ranking/${qid}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }
}
