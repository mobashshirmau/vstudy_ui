import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}
  //load all the cateogries
  public categories(jwt_tkn) {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt_tkn
   });
  return this._http.get(`${baseUrl}/category/`, { headers: reqHeader });

  }

  //add new category
  public addCategory(category) {
    return this._http.post(`${baseUrl}/add/category/`, category);
  }
}



    