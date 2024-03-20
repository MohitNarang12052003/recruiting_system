import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../users.service';
import { Job } from 'src/app/shared/interfaces/job.interface';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  jobs!: Job[];
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    console.log(this.cookieService.getAll());
    this.userService.fetchJobs().subscribe((data) => {
      this.jobs = data;
      console.log(data);
    });
  }
}
