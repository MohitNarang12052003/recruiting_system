import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONSTANTS } from '../shared/constants/app.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuardService {

  constructor(private cookieService:CookieService,private router:Router) { }
  canActivate():boolean{
    if(this.cookieService.get('role')!==APP_CONSTANTS.EMP_ROLE){
      //redirect to unauthorized page
      this.router.navigate(['/unauthorized'])
      return false;
    }
    return true;
  }
}
