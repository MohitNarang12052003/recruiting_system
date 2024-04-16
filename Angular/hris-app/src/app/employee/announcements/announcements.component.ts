import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Announcement } from 'src/app/shared/interfaces/announcement.interface';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcement!: Announcement[];
  pauseOnHover: boolean = true;
  pauseOnFocus: boolean = true;
  unpauseOnArrow: boolean = false;
  pauseOnIndicator: boolean = false;
  paused: boolean = false;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    console.log(this.cookieService.getAll());
    this.employeeService.fetchAnnouncement().subscribe((data) => {
      this.announcement = data;
      console.log(data);
    });
  }

  onSlide(event: any) {
    // Define the behavior of the onSlide method
  }

  togglePaused() {
    this.paused = !this.paused;
  }
}
