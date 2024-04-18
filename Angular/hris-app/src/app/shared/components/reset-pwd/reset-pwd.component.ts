import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent {
  resetPwdForm!:FormGroup;
  hidden!:boolean;
  fpToken!:any;


constructor(private sharedService:SharedService,private route:ActivatedRoute){}


ngOnInit(){
  //valid fp token and tte
  this.getToken();

  this.resetPwdFormFn();
}

getToken(){
  this.route.paramMap.subscribe((value)=>{
    this.fpToken=value.get("token")
    console.log(this.fpToken)

    this.validateFpToken();
  })
}

validateFpToken():void{
  console.log(1)
    this.sharedService.validateFpToken(this.fpToken).subscribe({
      next:(value)=>{
        console.log("success ",value);
        console.log(2)
        
      },
      error:(e)=>{
        console.log("error",e)
      }
    })
}

resetPwdFormFn():void{
  this.resetPwdForm=new FormGroup({
    new_pwd:new FormControl(),
    confirm_new_pwd:new FormControl(),
    token:new FormControl()
  })
}

  submit():void{
    this.sharedService.validateFpToken(this.fpToken).subscribe({
      next:(value)=>{
        console.log("success ",value);
        console.log(3)
        this.resetPwnFn();
        
      },
      error:(e)=>{
        console.log("error",e)
      }
    })
  }


  resetPwnFn(){
    this.resetPwdForm.patchValue({
      token:this.fpToken
    })

    console.log(this.resetPwdForm.get("token")?.value)
    this.sharedService.resetPwd(this.resetPwdForm.value).subscribe({
      next:(data)=>{
        console.log(data)
        console.log(4)
      },
      error:(e)=>{
        console.log("e ",e)
      }
    })
  }

  

}
