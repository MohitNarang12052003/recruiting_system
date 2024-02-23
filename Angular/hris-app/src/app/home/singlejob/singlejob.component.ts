import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-singlejob',
  templateUrl: './singlejob.component.html',
  styleUrls: ['./singlejob.component.css'],
})
export class SinglejobComponent implements OnInit {
  id!: any;
  title!: any;
  description!: any;
  activeYN!: any;
  department_name!: any;
  minimum_qualifications!: any;
  employment_type!: any;
  key_role!: any;
  location!: any;
  date_posted!: any;
  skills!: any;
  constructor(
    private cookieService: CookieService,
    private router: ActivatedRoute,
    private userService: UserService,
    private erouter: Router
  ) {}
  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.title = params['title'];
      this.description = params['description'];
      this.activeYN = params['activeYN'];
      this.date_posted = params['date_posted'];
      this.department_name = params['department_name'];
      this.minimum_qualifications = params['minimum_qualifications'];
      this.key_role = params['key_role'];
      this.employment_type = params['employment_type'];
      this.location = params['location'];
      this.skills = params['skills'];
    });
  }

  createForm = new FormGroup({
    userid: new FormControl(),
    j_id: new FormControl(),
  });

  submit() {
    const usid = this.cookieService.get('userid');
    console.log(usid);
    if (usid == '') {
      this.erouter.navigate(['/login']);
    } else {
      this.createForm
        .get('userid')
        ?.setValue(parseInt(this.cookieService.get('userid')));

      this.createForm.get('j_id')?.setValue(parseInt(this.id));

      console.log(this.createForm.value);
      this.userService
        .insertApplication(this.createForm.value)
        .subscribe((data) => {
          alert('Successfully applied for ' + this.title);
          this.erouter.navigate(['/']);
        });
    }
  }
}
