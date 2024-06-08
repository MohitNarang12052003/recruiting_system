import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  userId!: string;
  userDetails!: any;
  usersApplicationDetails!: any;
  degreesData!: any;
  jobHistoryData!: any;
  profile = 0;
  progressValue1 = 50;
  progressValue2 = 0;
  progressValue3 = 0;
  msg = 'Your application is under Process';
  
  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userId = this.cookieService.get('user_id');

    this.getDetails(this.userId);
    this.getAllQualificationsOfUser();
    this.getJobHistoryOfUser();
    this.getUserApplicationDetails();
  }

  view(num: number) {
    this.profile = num;
  }
  
  getDetails(id:any): void {
    this.userService.getDetails(id).subscribe({
      next: (data) => {
        this.userDetails = data;
      },
      error: (error) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  getUserApplicationDetails() {
    this.userService.getUserApplicationDetails().subscribe({
      next: (data) => {
        this.usersApplicationDetails = data;
      },
      error: (error) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  getAllQualificationsOfUser() {
   
    this.userService.getQualificationsOfUser(this.userId).subscribe({
      next: (data) => {
        this.degreesData = data;
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  getJobHistoryOfUser() {
    this.userId = this.cookieService.get('user_id');

    this.userService.getJobHistoryOfUser(this.userId).subscribe({
      next: (data) => {
        this.jobHistoryData = data;
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  public currentStep: number = 0;

  public goToNextStep(): void {
    this.currentStep += 1;
  }

  viewStatus(num: number, round1: string, round2: string, round3: string) {
    this.profile = 3;
    if (round1 == 'Pass' && round2 !== 'Pass') {
      this.currentStep = 1;
      this.msg = 'Wuhu! You have cleared round 1..Congratulationsss';
      this.progressValue1 = 100;
      this.progressValue2 = 50;
      this.progressValue3 = 0;
    }

    if (round3 !== 'Pass' && round2 == 'Pass') {
      this.currentStep = 2;
      this.progressValue1 = 100;
      this.progressValue2 = 100;
      this.progressValue3 = 50;
      this.msg = 'Congratulations!! You have cleared Round 2 as well';
    }
    if (round3 === 'Pass') {
      this.currentStep = 3;
      this.progressValue1 = 100;
      this.progressValue2 = 100;
      this.progressValue3 = 100;
      this.msg = 'Congratulations!! You have cleared All Rounds';
    }
  }
}
