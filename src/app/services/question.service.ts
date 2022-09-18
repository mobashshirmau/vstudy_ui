import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderAuthenticatorService } from './header-authenticator.service';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient, private _headerAuth: HeaderAuthenticatorService) {}

  public getQuestionsOfQuiz(qid) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }
 
  public getQuestionsOfQuizForTest(qid) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //add question
  public addQuestion(question) {
    return this._http.post(`${baseUrl}/add/question/`, question,{headers: this._headerAuth.createAuthorizationHeader()});
  }
  //delete question
  public deleteQuestion(questionId) {
    return this._http.delete(`${baseUrl}/question/${questionId}`,{headers: this._headerAuth.createAuthorizationHeader()});
  }

  //eval quiz
  public evalQuiz(submit_payload) {
    // questions['stu_id'] =  '21212'
    return this._http.post(`${baseUrl}/add/submit_ans`, submit_payload,{headers: this._headerAuth.createAuthorizationHeader()});
  }
}
