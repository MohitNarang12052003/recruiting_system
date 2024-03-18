import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit{
ForgotPwdForm!:FormGroup;
email!:string;
sent!:boolean;

constructor(private userService:UserService){}
ngOnInit(){
  this.forgotPwdForm()
}


forgotPwdForm(){
  this.ForgotPwdForm=new FormGroup({
    email:new FormControl(),
  })
}

submit(){
  this.email=this.ForgotPwdForm.get('email')?.value;
  this.userService.sendMail(this.email).subscribe({
    next:(data)=>{
      console.log(data);
      this.sent=true;
    },
    error:(e)=>{
      console.log("error",e);
    }
  })
}


}
