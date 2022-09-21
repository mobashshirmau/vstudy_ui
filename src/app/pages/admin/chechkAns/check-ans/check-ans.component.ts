import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-ans',
  templateUrl: './check-ans.component.html',
  styleUrls: ['./check-ans.component.css']
})
export class CheckAnsComponent implements OnInit {
  stu_class = ''
  stu_school = ''
  stu_name = ''
  ques_data;
  stu_id = ''
  qid = ''
 
  isSubmit = false;

  constructor(private userService: UserService,private snack: MatSnackBar, private QuestionSer: QuestionService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

sendit(data){
  this.userService.fetchUserDetails(data).subscribe(
    (result: any) => {
      if (result.status == 'failure')
      {
      Swal.fire('Error !!', 'User id not found');
    }
  else {
    this.stu_id = result['data'][0]['regId']
    this.stu_class = result['data'][0]['class']
    this.stu_school = result['data'][0]['school']
    this.stu_name = result['data'][0]['name']
    this.qid = this._route.snapshot.params.qid
    this.QuestionSer.getQuestionsOfQuizForTest(this.qid).subscribe(
      (res: any) => {
        this.ques_data = res.data
      })


  }
  },
    (error) => {      
      console.log(error);
      Swal.fire('Error !', 'Error in loading data !', 'error');
    }
)}

submitQuiz() {
  //calculation
  //call to sever  to check questions
  // this.questions.push({'stu_id':'3221'})
  const answer_keys = []
  const submit_payload= {}
  submit_payload['stu_id'] = this.stu_id;
  submit_payload['q_id'] = this.qid.toString()
  const temp_json = {}   
  this.ques_data.forEach(function (value) {
    if (value['givenAnswer'])
    {
    temp_json[value['ques_id']] = [value['givenAnswer']]
    }
    // answer_keys.push({ [value['ques_id']] :value['givenAnswer']})
  });
  submit_payload['data'] = temp_json
  this.QuestionSer.evalQuiz(submit_payload).subscribe(
    (data: any) => {
      this.isSubmit = true;
    },
    (error) => {
      console.log(error);
    }
  );
}

}
