import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.css']
})
export class ViewSubjectComponent implements OnInit {

  subjects = [];

  constructor(private _subject: SubjectService) {}

  ngOnInit(): void {
    this._subject.subjects().subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.subjects = result.data;
          
        }
        else{
          Swal.fire('Error !!', result.message, 'error')
          
        }
       
      },

      (error) => {
        //
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }
}
