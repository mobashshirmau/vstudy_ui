import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  subject = {
    title: '',
    description: '',
  };

  constructor(
    private _subject: SubjectService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (this.subject.title.trim() == '' || this.subject.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    //all done

    this._subject.addSubject(this.subject).subscribe(
      (data: any) => {
        this.subject.title = '';
        this.subject.description = '';
        Swal.fire('Success !!', 'subject is added successfuly', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server error !!', 'error');
      }
    );
  }
}
