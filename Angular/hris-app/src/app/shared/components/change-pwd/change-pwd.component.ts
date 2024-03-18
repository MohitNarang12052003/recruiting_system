import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {

  changePwdForm!:FormGroup;
  hidden!:boolean;


constructor(private sharedService:SharedService){}

ngOnInit(){
  this.changePwdFormFn();
}

changePwdFormFn():void{
  this.changePwdForm=new FormGroup({
    old_pwd:new FormControl(),
    new_pwd:new FormControl(),
    confirm_new_pwd:new FormControl()
  })
}

submit():void{
  if(this.changePwdForm.get("new_pwd")===this.changePwdForm.get("confirm_new_pwd")){
    this.sharedService.changePwd(this.changePwdForm.value).subscribe({
      next:(data)=>{
        console.log(data);
        this.hidden=true;
      },
      error:(e)=>{
        console.log("error ",e);
      }
    })
  }
  else{
    alert("invalid credentials");

  }
}


}
