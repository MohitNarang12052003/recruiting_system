import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-apply-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css'],
})
export class ApplyLeavesComponent {
  show: boolean = false;
  selectedType = '';

  constructor(
    private employeeService: EmployeeService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
    this.router.navigate(['/Employee']);
  }

  onSelected(value: string): void {
    this.selectedType = value;
  }

  createForm = new FormGroup({
    employee_id: new FormControl(),
    category_name: new FormControl(),
    applied_at: new FormControl(),
    taken_for: new FormControl(),
  });

  ApplyForLeave(): void {
    this.employeeService.ApplyLeave(this.createForm.value).subscribe((data) => {
      this.open();
    });
  }
  submit(): void {
    this.createForm.get('category_name')?.setValue(this.selectedType);
    const employeeId = parseInt(this.cookieService.get('employee_id'));
    this.createForm.get('employee_id')?.setValue(employeeId);
    this.ApplyForLeave();
  }
}
