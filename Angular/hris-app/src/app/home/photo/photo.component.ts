import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent {
  imageUrl: any;
  url: any;
  msg = '';
  submit = 0;
  constructor(
    private userService: UsersService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  createForm = new FormGroup({
    uid: new FormControl(),
    photo: new FormControl(),
  });
  selectFile(event: any) {
    //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
      this.submit = 1;
    };
    console.log(event.target.files[0]);

    this.imageUrl = event.target.files[0];
    console.log(event.target.files);
    this.createForm.patchValue({
      photo: event.target.files[0].name,
    });
  }

  submitPhoto() {
    this.createForm
      .get('uid')
      ?.setValue(parseInt(this.cookieService.get('user_id')));
    this.userService.uploadFile(this.imageUrl, 'photo').subscribe((data) => {
      console.log(data + ' inside photo');
      this.userService.insertPhoto(this.createForm.value).subscribe((data) => {
        console.log('inside login');
        this.router.navigate(['login']);
      });
    });
  }
}
