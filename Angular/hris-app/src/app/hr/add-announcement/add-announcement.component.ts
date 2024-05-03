import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent {

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


  constructor(
    private hrService: HrService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  createForm = new FormGroup({
    announcement:new FormControl(),
    hrid: new FormControl(),
  });

  submit() {
    this.createForm.get('hrid')?.setValue(parseInt(this.cookieService.get('hr_id')));
    console.log(this.createForm.value)
    this.hrService.AddAnnouncement(this.createForm.value).subscribe((data) => {
      this.display=1;
      this.openToast();
      // alert('Successfully Posted ' );
      this.router.navigate(['HR']);
    });
  }
}
