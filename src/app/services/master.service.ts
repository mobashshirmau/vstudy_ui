import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  isLoggedIn(){
    return localStorage.getItem('stu_id')!=null
  }
}
