import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-ans',
  templateUrl: './check-ans.component.html',
  styleUrls: ['./check-ans.component.css']
})
export class CheckAnsComponent implements OnInit {

  public checkAns = {
    registrationId: '',
    name: '',
    class: '',
    group: '',
  };

  constructor(private userService: UserService,private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

formSubmit(){
  console.log(this.checkAns.registrationId);

}
sendit(data){
  console.log("Value",data)
  this.userService.fetchUserDetails(data).subscribe(
    (data: any) => {
      //success
      console.log(data);
      //alert('success');
      Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success');
    },
)}
}
