import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-user',
  templateUrl: './upload-user.component.html',
  styleUrls: ['./upload-user.component.css']
})
export class UploadUserComponent implements OnInit {

  file:any;
  
  
    constructor(private router:Router,private _http:HttpClient,private _user:UserService) { } //DI for Service class
  
    //it is a life cycle or hook of component it will call after constructor
    //it call only one time
  
    ngOnInit(): void {
    
  }
  
  selectFile(event: any){
    this.file = event.target.files[0];
console.log(this.file);
  }
    
  uploadFile(){
    let formData = new FormData()
    console.log(formData);
    formData.append('file', this.file)
    console.log(formData)
    this._user.uploadUser(formData).subscribe(
      (data)=>{
        alert("Data Inserted To DataBase");
        this.router.navigate(['/ecommerce']);
      },
      (error)=>{
        alert("Something Went Wrong");
      
      })
  }
  
  
  }
  