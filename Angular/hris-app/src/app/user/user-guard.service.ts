import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private cookieService:CookieService) { }
  canActivate():boolean{
    const role=this.cookieService.get("role")
    if(role!=="-1"){
      //navigate to unauthorized page
      
      return false;
    }
    return true;

  }
}
