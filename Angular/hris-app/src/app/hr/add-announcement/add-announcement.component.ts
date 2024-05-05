import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css'],
})
export class AddAnnouncementComponent {
  show: boolean = false;
  display!: any;

  constructor(
    private hrService: HrService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  createForm = new FormGroup({
    announcement: new FormControl(),
    hrid: new FormControl(),
  });

  openToast() {
    this.show = true;
  }

  closeToast() {
    this.show = false;
    this.display = 0;
  }

  addAnnouncements(): void {
    this.hrService.AddAnnouncement(this.createForm.value).subscribe((data) => {
      this.display = 1;
      this.openToast();
      this.router.navigate(['HR']);
    });
  }

  submit() {
    this.createForm
      .get('hrid')
      ?.setValue(parseInt(this.cookieService.get('hr_id')));
    this.addAnnouncements();
  }
}
