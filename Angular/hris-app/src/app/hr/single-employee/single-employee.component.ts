import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HrService } from '../hr.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css'],
})
export class SingleEmployeeComponent implements OnInit {
  employeeId!: number;
  employeeData!: any;
  degreesData!: any;
  jobHistoryData!: any;
  userId!: any;
  degreesDataBool!: boolean;
  jobHistoryDataBool!: boolean;

  constructor(
    private route: ActivatedRoute,
    private hrService: HrService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getEmployeeId();
  }

  getEmployeeId() {
    this.route.params.subscribe((params) => {
      const employeeEmail = params['email'];
      const employeeId = this.getEidFromEmailFn(employeeEmail);
      this.employeeId = employeeId;
    });
  }

  getEidFromEmailFn(email: string): any {
    this.hrService.getEidFromEmail(email).subscribe({
      next: (data) => {
        this.employeeId = data['employee_id'];
        this.getEmployeeDetails();
      },
    });
  }

  getEmployeeDetails() {
    this.hrService.getSingleEmployee(this.employeeId).subscribe({
      next: (data) => {
        this.employeeData = data;
        this.getAllQualificationsOfEmployee();
        this.getJobHistoryOfEmployee();
      },
      error: (error) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  getAllQualificationsOfEmployee() {
    this.userId = this.employeeData.user_id;

    this.hrService.getQualificationsOfUser(this.userId).subscribe({
      next: (data) => {
        this.degreesData = data;
        if (data.length > 0) {
          this.degreesDataBool = true;
        }
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  getJobHistoryOfEmployee() {
    this.userId = this.employeeData.user_id;

    this.hrService.getJobHistoryOfUser(this.userId).subscribe({
      next: (data) => {
        this.jobHistoryData = data;
        if (data.length > 0) {
          this.jobHistoryDataBool = true;
        }
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }
}
