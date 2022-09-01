import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-ans',
  templateUrl: './view-ans.component.html',
  styleUrls: ['./view-ans.component.css']
})
export class ViewAnsComponent implements OnInit {

  qid;
  stu_id='5249962';
  show_answersheet={
    qid:'',
    stu_id:''
  }
  quiz;

  constructor(
    private _route: ActivatedRoute,
    private _user: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    console.log(this.stu_id);
    const get_answersheet= {}
    get_answersheet['stu_id'] = '1213'
    get_answersheet['q_id'] = this.qid;
    console.log(get_answersheet)
    this._user.getAnswersheet(get_answersheet).subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.quiz = result.data;
          console.log(this.quiz[0].title)
          
        }},
      (error) => {
        console.log(error);
        alert('Error in loading quiz data');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',

      showCancelButton: true,
      confirmButtonText: `Start`,
      denyButtonText: `Don't save`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
