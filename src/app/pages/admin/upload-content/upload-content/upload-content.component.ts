import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudyMaterialService } from 'src/app/services/study-material.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-content',
  templateUrl: './upload-content.component.html',
  styleUrls: ['./upload-content.component.css']
})
export class UploadContentComponent implements OnInit {


   // form group
   form: FormGroup;
  subject: any;
  fileName:''

   constructor(private http: HttpClient, 
               private fb: FormBuilder,
               private _subject:SubjectService,
               private _stuMat:StudyMaterialService) {
 
     this.form = this.fb.group({
       class: [''],
       subject_id: [''],
       chapterName:[''],
       file: [''],
       fileSource: [null],
     });

   }
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
 
   get f() {
     return this.form.controls;
   }
 
   // on file select event
   onFileChange(event) {
     if (event.target.files.length > 0) {
       const file = event.target.files[0];
       this.fileName = file.name
       this.form.patchValue({
         fileSource: file
       });
     }
   }
 
   // on form submit function
   onSubmit() {
     const formData = new FormData();
     formData.append('file', this.form.get('fileSource').value);
     formData.append('class', this.form.get('class').value);
     formData.append('subject_id', this.form.get('subject_id').value);
     formData.append('chapterName', this.form.get('chapterName').value);
 
     this._stuMat.addContent(formData)
       .subscribe(res => {
 
         alert('Uploaded Successfully.');
       })
   }
 
}
