import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  goalForm!: FormGroup;
  goalsData!: any;
  singleGoalData!: any;
  show: boolean = false;
  display!: any;

  constructor(
    private employeeService: EmployeeService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchGoalsFn();
  }

  openToast() {
    this.show = true;
  }

  closeToast() {
    this.show = false;
    this.display = 0;
  }

  fetchGoalsFn() {
    this.employeeService.fetchGoals().subscribe({
      next: (data) => {
        this.goalsData = data;
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  goalFormFn() {
    this.goalForm = new FormGroup({
      goal_id: new FormControl(),
      goal_title: new FormControl(),
      goal_description: new FormControl(),
    });
  }

  addGoalFn() {
    this.employeeService.addGoal(this.goalForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchGoalsFn();
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  deleteGoalFn(goal_id: any) {
    this.employeeService.deleteGoal(goal_id).subscribe({
      next: () => {
        this.fetchGoalsFn();
      },
      error: () => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  updateGoalFn(): void {
    this.employeeService.updateGoal(this.goalForm.value).subscribe({
      next: (data) => {
        this.fetchGoalsFn();
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  prefillFn(): void {
    this.goalForm.patchValue({
      goal_id: this.g_id,
      goal_title: this.singleGoalData.title,
      goal_description: this.singleGoalData.description,
    });
  }

  getSingleGoalData(): void {
    this.employeeService.singleGoalData(this.g_id).subscribe({
      next: (data) => {
        this.singleGoalData = data;

        this.prefillFn();
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  private modalService = inject(NgbModal);
  g_id!: number;
  open(content: TemplateRef<any>, goal_id?: number) {
    this.goalFormFn();

    if (goal_id !== undefined) {
      this.g_id = goal_id;
      this.getSingleGoalData();

      this.modalService.open(content).result.then(
        (result) => {
          this.updateGoalFn();
        },
        (reason) => {
          this.openToast();
          this.display = 2;
        }
      );
    } else {
      this.modalService.open(content).result.then(
        (result) => {
          this.addGoalFn();
        },
        (reason) => {
          this.openToast();
          this.display = 1;
        }
      );
    }
  }
}
