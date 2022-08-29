import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  catId;
  quizzes;
  constructor(private _route: ActivatedRoute, private _quiz: QuizService) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      console.log(params);
      this.catId = params.catId;
      if (this.catId == 0) {
        console.log('Load all the quiz');

        this._quiz.getActiveQuizzes().subscribe(
          (result: any) => {
            if(result.status=='success'){
              this.quizzes = result.data;
              
            }},
          (error) => {
            console.log(error);
            alert('error in loading all quizzes');
          }
        );
      } else {
        console.log('Load specific quiz');

        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (result: any) => {
            if(result.status=='success'){
              this.quizzes = result.data;
              this.quizzes = this.quizzes[0]
            }},
          (error) => {
            alert('error in loading quiz data');
          }
        );
      }
    });
  }
}