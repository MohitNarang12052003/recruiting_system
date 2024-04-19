import { Component, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { AgChartsAngular } from "ag-charts-angular";
import { AgChartOptions, AgCharts } from "ag-charts-community";


@Component({
  selector: 'app-emp-dept-piechart',
  templateUrl: './emp-dept-piechart.component.html',
  styleUrls: ['./emp-dept-piechart.component.css']
})
export class EmpDeptPiechartComponent implements OnInit{
  public options: AgChartOptions = {}; // Initialize options

  constructor(private hrService: HrService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.hrService.empDeptCount().subscribe({
      next: (data) => {
        console.log(data);
        this.createPieChart(data); // Pass data to create pie chart
      },
      error: (e) => {
        console.log("err", e)
      }
    })
  }

  createPieChart(data: any): void {
    this.options = {
      data: data,
      title: {
        text: "Employee Composition",
      },
      series: [{
        type: "pie",
        angleKey: "count", // Assuming 'count' is the property containing values
        legendItemKey: "department_name", // Assuming 'department_name' is the property containing labels
      }],
    };
  }

}
