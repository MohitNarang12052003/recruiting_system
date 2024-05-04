import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register-dashboard',
  templateUrl: './register-dashboard.component.html',
  styleUrls: ['./register-dashboard.component.css']
})
export class RegisterDashboardComponent {
  active:number=1;
  constructor(public sharedService: UsersService) {
  }

  
}
