import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  selectedType = '';
  
  onSelected(value: string): void {
    this.selectedType = value;
  }

  constructor(private router: Router, private userService: UserService,private cookieService:CookieService ) {}

  createForm=new FormGroup({
    uid:new FormControl(),
    jtitle:new FormControl(),
    cname:new FormControl(),
    fyear:new FormControl(),
    tyear:new FormControl(),
    desc:new FormControl()
  })

  add(){
    this.submit(0);
    this.createForm.reset();
  }

  submit(done:number){
    this.createForm.get("uid")?.setValue(parseInt(this.cookieService.get("user_id")));
    this.userService.insertJobHistory(this.createForm.value).subscribe((data)=>{
      if(done==1){
        this.router.navigate(['General'])
      }
    })
  }


}
