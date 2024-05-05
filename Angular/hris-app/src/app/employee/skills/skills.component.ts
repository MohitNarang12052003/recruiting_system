import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { CookieService } from 'ngx-cookie-service';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skillsData!: any;
  skillForm!: FormGroup;
  display!: any;
  show!: boolean;

  constructor(
    private employeeService: EmployeeService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  ngOnInit() {
    this.fetchSkillsData();
  }

  openToast() {
    this.show = true;
  }

  closeToast() {
    this.show = false;
    this.display = 0;
  }

  fetchSkillsData() {
    this.employeeService.getSkills().subscribe({
      next: (data) => {
        this.skillsData = data;
      },
      error: (error) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  skillFormFn() {
    this.skillForm = new FormGroup({
      skill: new FormControl(),
    });
  }

  private modalService = inject(NgbModal);

  open(content: TemplateRef<any>) {
    this.skillFormFn();

    this.modalService.open(content).result.then(
      (result) => {
        this.addSkillFn();
      },
      (reason) => {
        this.openToast();
        this.display = 3;
      }
    );
  }

  addSkillFn(): void {
    const newSkill = this.skillForm.get('skill')?.value;
    this.employeeService.addSkill(newSkill).subscribe({
      next: (data) => {
        this.fetchSkillsData();
        this.openToast();
        this.display = 1;
      },
      error: (error) => {
        this.openToast();
        this.display = 2;
      },
    });
  }
}
