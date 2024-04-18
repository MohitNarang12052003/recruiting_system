import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoryLeaveCount } from 'src/app/shared/interfaces/categoryLeaveCount.interface';
import { EmployeeService } from '../employee.service';
import { AgChartsAngular } from "ag-charts-angular";
import { AgChartOptions, AgCharts } from "ag-charts-community";

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit{
  moreLeaves!:boolean;
  totalLeaveCount!: number;
  categoryLeaveCount!: CategoryLeaveCount[];
  employeeId!: any;
  options!:any;
  constructor(
    private cookieService: CookieService,
    private route:ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}
  ngOnInit(): void {
    this.getEmployeeId();
  }

  applyLeave(): void {
    this.router.navigate(['Apply-leave']);
}

  getEmployeeId(){
    this.employeeId = Number(this.cookieService.get("employee_id"))
    this.getTotalLeavesCount(this.employeeId);
    this.getCategoryWiseCount(this.employeeId);
   }

  getTotalLeavesCount(id:number): void {
    this.employeeService.getTotalLeavesCount(id).subscribe((data) => {
      this.totalLeaveCount = data.leave_count;
      if(this.totalLeaveCount>12){
        this.moreLeaves=true
      }
    
      console.log("checking data",data);
    });
  }

  getCategoryWiseCount(id:number): void {
    this.employeeService.getCategoryWiseCount(id).subscribe(data => {
      this.categoryLeaveCount = data;
      console.log("checking data 2",this.categoryLeaveCount);
      this.createPieChart(data);
    });
  }


  createPieChart(data: CategoryLeaveCount[]): void {
    this.options = {
      data: data,
      title: {
        text: "Leaves Composition",
      },
      series: [{
        type: "pie",
        angleKey: "leave_count", // Assuming 'count' is the property containing values
        legendItemKey: "category_name", // Assuming 'department_name' is the property containing labels
      }],
    };
  }


}
