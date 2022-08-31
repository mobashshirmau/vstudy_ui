import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/services/level.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-level',
  templateUrl: './view-level.component.html',
  styleUrls: ['./view-level.component.css']
})
export class ViewLevelComponent implements OnInit {

  levels = [];

  constructor(private _level: LevelService) {}

  ngOnInit(): void {
    this._level.levels().subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.levels = result.data;
  
          
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
