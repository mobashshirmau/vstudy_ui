import { LocationStrategy } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  math = Math;
  qid;
  questions;
  length;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;
  stu_id=localStorage.getItem('stu_id');
  start_time:number;
  minute_per_question : number;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this._quiz.getQuizStartTimeForAStudent({"q_id" : this.qid,"stu_id": this.stu_id}).subscribe(
      (result:any) =>{
        if(result.status=='success'){
        this.start_time = parseInt(result.data[0]['started_at'])
        this.minute_per_question = parseInt(result.data[0]['time_per_qstn_ms'])
        
        }
      }
    );
    this.loadQuestions();
    // var currentTime=Date.now();
    
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.questions = result.data;
          // this.timer = this.questions.length * 1 * 60;
          var sec_per_question =  (this.minute_per_question/1000)/60
          console.log(sec_per_question)
          this.timer = this.questions.length * sec_per_question * 60 - ((Date.now()-this.start_time)/1000);
          // console.log("Before"+this.timer)
          this.timer = this.math.trunc(this.timer)
          // console.log("After"+this.timer)
          const quesLength = this.questions.length;
          this.startTimer();
        }
        else{
          Swal.fire('Error !!', result.message, 'error')
          
        }
       
      },

      (error) => {
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
   
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    //calculation
    //call to sever  to check questions
    // this.questions.push({'stu_id':'3221'})
    const answer_keys = []
    const submit_payload= {}
    submit_payload['stu_id'] = this.stu_id;
    submit_payload['q_id'] = this.qid.toString()
    const temp_json = {}   
    this.questions.forEach(function (value) {
      console.log(value)
      if (value['givenAnswer'])
      {
      temp_json[value['ques_id']] = value['givenAnswer'].toString()
      }
      // answer_keys.push({ [value['ques_id']] :value['givenAnswer']})
    });
    submit_payload['data'] = temp_json
    this._question.evalQuiz(submit_payload).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );
    // this.isSubmit = true;
    // this.questions.forEach((q) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle =
    //       this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }
    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    // console.log('Correct Answers :' + this.correctAnswers);
    // console.log('Marks Got ' + this.marksGot);
    // console.log('attempted ' + this.attempted);
    // console.log(this.questions);
  }
}
