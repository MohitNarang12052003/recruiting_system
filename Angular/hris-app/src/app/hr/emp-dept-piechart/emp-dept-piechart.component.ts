import { Component, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions, AgCharts } from 'ag-charts-community';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-dept-piechart',
  templateUrl: './emp-dept-piechart.component.html',
  styleUrls: ['./emp-dept-piechart.component.css'],
})
export class EmpDeptPiechartComponent implements OnInit {
  public options: AgChartOptions = {}; // Initialize options

  constructor(private hrService: HrService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.hrService.empDeptCount().subscribe({
      next: (data) => {
        this.createPieChart(data); // Pass data to create pie chart
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  createPieChart(data: any): void {
    this.options = {
      data: data,
      title: {
        text: 'Employee Composition',
      },
      series: [
        {
          type: 'pie',
          angleKey: 'count',
          legendItemKey: 'department_name',
        },
      ],
    };
  }
}
