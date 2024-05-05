import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css'],
})
export class ViewApplicantsComponent implements OnInit {
  applications!: any[];
  success!: boolean;

  constructor(private hrService: HrService, private router: Router) {}

  ngOnInit(): void {
    this.viewApplications();
  }
  viewApplications(): void {
    this.hrService.viewApplications().subscribe((data) => {
      this.applications = data;
    });
  }
}
