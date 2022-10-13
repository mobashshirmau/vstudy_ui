import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import baseUrl from 'src/app/services/helper';
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
       subject: [''],
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
     formData.append('class_st', this.form.get('class').value);
     formData.append('subject', this.form.get('subject').value);
     formData.append('chapterName', this.form.get('chapterName').value);
    //  this.http.post(`${baseUrl}/add/study-material`, formData).subscribe(res => {
 
    //   alert('Uploaded Successfully.');
    // })
    fetch('assets/uploaded-data/study-material/3/Hindi/Chapter3/BRAIN BRAWL SYLLABUS.pdf')
  .then(response => response.text())
  .then(data => {
  	// Do something with your data
  	console.log(data);
  });
     this._stuMat.addStudyMaterial(formData)
       .subscribe(res => {
 
         alert('Uploaded Successfully.');
       })
   }
 
}
