import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-original-documents',
  templateUrl: './original-documents.component.html',
  styleUrls: ['./original-documents.component.css']
})
export class OriginalDocumentsComponent implements OnInit{
  part1=true

  show:boolean = false;
  display!:any;

  openToast(){
    this.show=true;
    console.log(this.display)
  }

	closeToast() {
		this.show = false;
    this.display=0;
	}
  
  constructor(private cookieService:CookieService,private router:Router,private userService:UsersService){ }
  ngOnInit(){
    if(this.cookieService.get("role")!=="-1"){
      this.router.navigate(["/login"]);
    }
  }
  createForm=new FormGroup({
    aadhar:new FormControl(),
    pan:new FormControl(),
    voter:new FormControl(),
    esign:new FormControl(),
    ifsc_code:new FormControl(),
    account_no:new FormControl(),
    passport_no:new FormControl(),
    name_of_acc_holder:new FormControl(),
    user_id:new FormControl()
  })
  url!:any;
  submit(){
    if(this.part1==true){
      this.part1=false;
      
    }
    else{
      this.createForm.get("user_id")?.setValue(parseInt(this.cookieService.get("user_id")));
      this.userService.insertDocuments(this.createForm.value).subscribe((data)=>{
        console.log(data);
        // alert("All documents Uploaded!! Thankyou will get back to you");
        this.openToast();
        this.display=1;
      })
      
    }

  }
  read(event: any,name:string) {
    this.url = event.target.files[0];
    console.log(event.target.files);
    this.createForm.patchValue({
      [name]: event.target.files[0].name,
    });
    this.userService.uploadFile(this.url, name,this.cookieService.get("user_id")).subscribe((data) =>{
      // this.router.navigate(['Qualification']);
      console.log(data);
    });
    
  }

}
