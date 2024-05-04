import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private cookieService:CookieService,private router:Router) { }
  canActivate():boolean{
    const role=this.cookieService.get("role")
    if(role!=="-1"){
      this.router.navigate(['/unauthorized'])
      
      return false;
    }
    return true;

  }
}
