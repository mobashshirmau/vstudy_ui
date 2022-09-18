import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories = [];

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this._category.categories().subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.categories = result.data;
          
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