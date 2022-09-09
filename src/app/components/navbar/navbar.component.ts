import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;
  categories;

  @Output() closeSideNav = new EventEmitter();
  role: string;

   onToggleClose() {
    this.closeSideNav.emit();
}
  constructor(public login: LoginService, private router: Router,private _cat: CategoryService, private _snack: MatSnackBar,private _master:MasterService) {}

  ngOnInit(): void {
    
    console.log(this._master.isLoggedIn());

    this._cat.categories().subscribe(
      (result: any) => {
        if(result.status=='success'){
          this.categories = result.data;
          this.role = localStorage.getItem('role');
          
        }
        else{
          this._snack.open(result.message);
        
        }
       
      },
      (error) => {
        this._snack.open('Error in loading categories from server', '', {
          duration: 3000,
        });
      }
    );

  }

  
  public logout() {
    this.login.logout();
    // window.location.reload();
    this.router.navigate(['login']);
  
    this.login.loginStatusSubject.next(false);
  }
}
