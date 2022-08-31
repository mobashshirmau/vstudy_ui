import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LevelService } from 'src/app/services/level.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-level',
  templateUrl: './add-level.component.html',
  styleUrls: ['./add-level.component.css']
})
export class AddLevelComponent implements OnInit {

  level = {
    title: '',
    description: '',
    class:'',
  };

  constructor(
    private _level: LevelService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (this.level.title.trim() == '' || this.level.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    //all done

    this._level.addLevel(this.level).subscribe(
      (data: any) => {
        this.level.title = '';
        this.level.description = '';
        Swal.fire('Success !!', 'level is added successfuly', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server error !!', 'error');
      }
    );
  }
}
