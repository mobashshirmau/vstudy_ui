import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-content',
  templateUrl: './upload-content.component.html',
  styleUrls: ['./upload-content.component.css']
})
export class UploadContentComponent implements OnInit {


  uploadContent = {
    sub_id:'',
    class:'',
    chapterName:'',
    uploadFile:'',
  };
  selectedFile:''


  subject: any;
  resData: any;
  

  constructor(
    private _subject: SubjectService,
    private _user: UserService,
    private _route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this._subject.subjects().subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.subject = result.data;
          
        }
        else{
          Swal.fire('Error !!', result.message, 'error')
          
        }
       
      },

      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'error in loading data from server', 'error');
      }
    );
  }

  selectFile(event: any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
    
 
   
  formSubmit() {
    this.uploadContent['uploadFile']=this.selectedFile;
    console.log(this.uploadContent)
    this._user.uploadContent(this.uploadContent).subscribe(
      (data: any) => {
        Swal.fire('Success ', 'Question Added. Add Another one', 'success');
      },
      (error) => {
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }
}
