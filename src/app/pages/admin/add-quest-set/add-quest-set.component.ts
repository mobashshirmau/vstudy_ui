import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import { StudyMaterialService } from 'src/app/services/study-material.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quest-set',
  templateUrl: './add-quest-set.component.html',
  styleUrls: ['./add-quest-set.component.css']
})
export class AddQuestSetComponent implements OnInit {

  gaugeTitleForm!: FormGroup;
  subjectWeightage!: FormArray;
  name: string | undefined;
  sub: any;
 
  totalPercentage:number=0
  remainingPercentage:number=0
  

  constructor(private formBuilder: FormBuilder,
              private _subject:SubjectService,
              private _quiz:QuizService,
              private snack: MatSnackBar,){}

  ngOnInit() {
    this._subject.subjects().subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.sub = result.data;
          
        }
        else{
          Swal.fire('Error !!', result.message, 'error')
          
        }
      },

      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'error in loading data from server', 'error');
      }
    );
    this.gaugeTitleForm = this.formBuilder.group({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      subjectWeightage: this.formBuilder.array([this.createItem()])
    });
  }
  
   createItem(){
    return this.formBuilder.group({
      subject:["",Validators.required],
      percentage:["",Validators.required],
    });
  }
  addItem():void{
    this.subjectWeightage = this.gaugeTitleForm.get('subjectWeightage') as FormArray;
    this.subjectWeightage.push(this.createItem());
  }
  removeRow(index: number) {
    console.log(index);
    (<FormArray>this.gaugeTitleForm.get("subjectWeightage")).removeAt(index);
  }
  onSubmit(){
    this._quiz.addQuestionSetProfile(this.gaugeTitleForm.value).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'Quiz Set is added successfuly', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server error !!', 'error');
      }
    );
  }
    
  sendit(data){
      if(data.length>0){
      this.totalPercentage = this.totalPercentage + parseInt(data)
      this.remainingPercentage = 100-this.totalPercentage
      }
      if(this.remainingPercentage<0){
        this.snack.open('Percentage Exceed 100', '', {
          duration: 3000,
        });
      }
    }
    checkDataPresent(value){
      if(value.length>0){
        this.totalPercentage=this.totalPercentage-parseInt(value)
      }
    }
    
  focusFunction(val){
      console.log()
  }
  getControls() {
    return (this.gaugeTitleForm.get('subjectWeightage') as FormArray).controls;
  }

  }