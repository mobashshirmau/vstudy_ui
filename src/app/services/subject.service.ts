import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private _http: HttpClient) {}
  //load all the cateogries
  public subjects() {
    return this._http.get(`${baseUrl}/subject/`);
  }

  //add new category
  public addSubject(subject) {
    return this._http.post(`${baseUrl}/add/subject/`, subject);
  }
}