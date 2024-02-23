import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isDone: number = 0;
  imageUrl: any;

  constructor(
    private userService: UserService,
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

  add() {
    this.isDone = 1;
  }

  submit(): void {
    console.log(this.createForm.value);
    // this.userService.insertUser(this.createForm.value).subscribe((val) => {
    //   console.log(val);
    //   console.log('done!!!!!!');

    // });

    this.userService.uploadFile(this.imageUrl, 'resume').subscribe((data) => {
      this.userService.insertUser(this.createForm.value).subscribe((data) => {
        console.log(data);

        // this.userService.loginUser(this.loginform.value).subscribe((data) => {
        //   this.cookieService.set('uid', data.user_id.toString());
        // });
        // this.login(
        //   this.createForm.get('email'),
        //   this.createForm.get('password')
        // );
        const em=this.createForm.get('email')?.value
        const pw=this.createForm.get("password")?.value
        if(em!==null && pw!==null){
          this.cookieService.set("email",em.toString());
          this.cookieService.set("pwd",pw.toString())
        }
       
        this.router.navigate(['Qualification']);
      });
    });
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
}
