import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})

export class RankingComponent implements OnInit {
  
qid;
dataSource;
sno:number
displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);

    this._quiz.getRanking(this.qid).subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.dataSource = result.data;
          
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

}
