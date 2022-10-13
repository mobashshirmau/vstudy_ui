import { Component, OnInit } from '@angular/core';
import { StudyMaterialService } from 'src/app/services/study-material.service';

@Component({
  selector: 'app-e-library',
  templateUrl: './e-library.component.html',
  styleUrls: ['./e-library.component.css']
})
export class ELibraryComponent implements OnInit {
  subject;
  class;
  constructor(private _sm:StudyMaterialService) { }

  ngOnInit(): void {
    this.class=localStorage.getItem('class');
    this._sm.getAllSubject(this.class).subscribe(
      (result: any) => {
          this.subject = result;
          console.log(this.subject)
          
        },
      (error) => {
        console.log(error);
        alert('error in loading Subject');
      }
    );

    this.subject=['Hindi','English','Maths','Science','Social Science','History']
  }

}
