import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  userid!:any;
  constructor(private cookieService:CookieService){}

  ngOnInit(){

    this.isLoggedIn()
    


  }

  isLoggedIn():boolean{
    this.userid= this.cookieService.get('user_id');
    const employee_id=!!this.cookieService.get('employee_id');
    const hr_id=!!this.cookieService.get('hr_id');
    
    const loggedIn= (this.userid || employee_id || hr_id);
    // console.log(this.userid)
    return loggedIn;
  }

  logOut(){
    console.log("hello");
    console.log(this.userid);
      this.cookieService.deleteAll();

  }

  

}
