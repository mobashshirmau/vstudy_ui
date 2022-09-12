import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  status:boolean;

  @Output() SideNavToggle = new EventEmitter();  

  
  openSidenav() {
   this.SideNavToggle.emit();
}


  constructor(private _master:MasterService,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('stu_id');
    localStorage.removeItem('role');
    localStorage.removeItem('auth-token');
    this.router.navigate(["login"])
  }
  loggedIn(){
    return localStorage.getItem('stu_id');
  }
}
