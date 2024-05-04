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
  showAll!: boolean;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.fetchJobsFn();
  }

  fetchJobsFn(): void {
    this.userService.fetchJobs().subscribe((data) => {
      this.jobs = data;
    });
  }

  showAllFn(): void {
    if (this.showAll) this.showAll = false;
    else this.showAll = true;
  }
}
