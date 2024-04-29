import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RegisterDashboardComponent } from '../register-dashboard/register-dashboard.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isDone: number = 0;
  imageUrl: any;
  submitBtn=false;
  disabled!:true;

  hide = true;
  hide1=true;

  toggleVisibility(): void {
    this.hide = !this.hide;
  }
  toggleVisibility1():void{
    this.hide1 = !this.hide1;
  }
  constructor(
    private userService: UsersService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  
  createForm = new FormGroup({
    full_name: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    dob: new FormControl(),
    phone: new FormControl(),
    work_exp: new FormControl(),
    resume: new FormControl(),
    exp_ctc: new FormControl(),
    curr_ctc: new FormControl(),
    cpassword: new FormControl(),
  });
  // loginform = new FormGroup({
  //   email: new FormControl(),
  //   pwd: new FormControl(),
  // });

  // add() {
  //   this.alreadyExistsFn();
    
  // }


  callOnSubmit(){
    if(!this.isDone){
      this.alreadyExistsFn();
    }
    else if(this.submitBtn){
      this.submit()
    }
  }

  onChange(e: any) {
    console.log(e.target.value);
    this.createForm.get('work_exp')?.setValue(e.target.value);
  }


  submit(): void {
    console.log(this.createForm.value);
    // this.userService.insertUser(this.createForm.value).subscribe((val) => {
    //   console.log(val);
    //   console.log('done!!!!!!');

    // });

    // this.userService.uploadFile(this.imageUrl, 'resume',this.createForm.get("usern")?.value).subscribe((data) => {
      this.userService.insertUser(this.createForm.value).subscribe((data) => {
        console.log(data);

        // this.userService.loginUser(this.loginform.value).subscribe((data) => {
        //   this.cookieService.set('uid', data.user_id.toString());
        // });
        // this.login(
        //   this.createForm.get('email'),
        //   this.createForm.get('password')
        // );
        const em = this.createForm.get('email')?.value;
        const pw = this.createForm.get('password')?.value;
        if (em !== null && pw !== null) {
          this.cookieService.set('email', em.toString());
          this.cookieService.set('pwd', pw.toString());
          
        }
        this.userService.loginUser({'email':em,'pwd':pw}).subscribe((data)=>{
          console.log(data);
          this.cookieService.set('user_id',data.user_id.toString());
          this.userService.uploadFile(this.imageUrl, 'resume',this.cookieService.get("user_id")).subscribe((data) =>{
            // this.router.navigate(['Qualification']);
            this.userService.setActive();
            this.disabled=true;

          });
        });

        
      });
    // });
  }

  // login(email: any, pwd: any) {
  //   // this.loginform.controls.email.setValue (email) ;
  //   //     this.loginform.controls.pwd.setValue (pwd) ;
  //   this.userService.loginUser().subscribe((data) => {
  //     this.cookieService.set('uid', data.user_id.toString());
  //   });
  // }

  read(event: any) {
    this.imageUrl = event.target.files[0];
    console.log(event.target.files);
    this.createForm.patchValue({
      resume: event.target.files[0].name,
    });
  }

  alreadyExistsFn(){
    console.log("clicked")
    this.userService.alreadyExists(this.createForm.get("username")?.value,this.createForm.get("email")?.value).subscribe((data)=>{
      console.log(data)
      if(data["already_exists"]==1){
        alert("username already exists");
      }
      if(data["already_exists"]==2){
        alert("email already exists");
      }
      if(data["already_exists"]==3){
        alert("username and email already exist");
      }
      if(data["already_exists"]==0){
        this.isDone = 1;
      }
      
    })
  }


  checkButton(){
    if(this.userService.active>1) return true;

    return false;
  }
}
