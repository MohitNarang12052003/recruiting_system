import { Component } from '@angular/core';
import { HrService } from '../hr.service';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent {
  employees!:any[];

  constructor(private hrService:HrService,private router:Router){

  }

  ngOnInit(): void {
  this.getEmployeeDetails();
  }

  getEmployeeDetails():void{
    this.hrService.viewEmployees().subscribe((data)=>{
      this.employees=data;
    })
  }


  exportToCsv(): void {
    const data=this.employees

     // Specify how to handle null values in the CSV
     const replacer = (key: string, value: any) => (value === null || value===undefined) ? '' : value;
    
     // Extract header from the first row of data
     let header = Object.keys(data[0]);

     
     
     // Map each row of data to a CSV row
     let csv = data.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
     
     // Add the header row to the beginning of the CSV
     csv.unshift(header.join(','));
     
     // Join all CSV rows into a single string with line breaks
     let csvArray = csv.join('\r\n');
 
     // Create a Blob containing the CSV data
     var blob = new Blob([csvArray], {type: 'text/csv' });
 
     // Trigger the download of the Blob as a file named "myFile.csv"
     saveAs(blob, "employees.csv");
  }
  

}
