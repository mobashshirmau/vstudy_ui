import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/services/level.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [];
  levels = [];

  constructor(private _quiz: QuizService,private _level: LevelService) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.quizzes = result.data;
          
        }
        else{
          Swal.fire('Error !!', result.message, 'error')
          
        }
       
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
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
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }

  //
  deleteQuiz(qId) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete...

        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);
            Swal.fire('Success', 'Quiz deleted ', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          }
        );
      }
    });
  }
}
