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
    const role=!!this.cookieService.get('role');
    this.userid= this.cookieService.get('user_id');

    const loggedIn= (role);
    // console.log(this.userid)
    return loggedIn;
  }

  logOut(){
    console.log("hello");
    console.log(this.userid);
      this.cookieService.deleteAll();

  }

  

}
