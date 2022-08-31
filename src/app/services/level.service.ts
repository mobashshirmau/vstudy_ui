import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  constructor(private _http: HttpClient) {}
  //load all the cateogries
  public levels() {
    return this._http.get(`${baseUrl}/level/`);
  }

  //add new category
  public addLevel(level) {
    return this._http.post(`${baseUrl}/add/level/`, level);
  }
}