import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private chartService:ChartsService) { }

  productSalesData:any
  productChartType= ChartType.BarChart
  chartColumns=["Products","Sales 1",{role:'annotation'},{role:'tooltip'},"Sales 2",{role:'annotation'},{role:'tooltip'}]
  productTitle="Bika hua saman"
  productChartOptions = {
    colors: ['blue','red'],
    bar:{groupWidth:"100%"},
    // isStacked:true,
    legend:{
      textStyle:{
        fontName: 'Arial',
        fontSize: 18,
        bold: true,
        italic: true
      },
      position:'top',
      alignment:'end'
    }
  };

  ngOnInit(): void {
    this.fetchSalesByProduct()
    this.fetchSalesByYear()
    this.fetchSalesByState()
  }

  fetchSalesByProduct(){
    this.chartService.fetchSalesByProduct().subscribe((value)=>{
      this.productSalesData=value
      console.log(this.productSalesData)
      this.productSalesData.forEach((element: any) => {
          element.push(element[1]+' Rs')
          element.push(element[0]+" "+element[1] +' Rs')
          element.push(element[1]/2)
          element.push(element[1]/2 +' Rs')
          element.push(element[0]+" "+element[1]/2 +' Rs')
      });
    })
  }

  yearSalesData:any
  yearChartType= ChartType.PieChart
  yearColumns=["Products","Sales"]
  yearTitle="Year wise Bika hua saman"
  yearChartOptions = {
    is3D:true,
    colors: ['blue','red','yellow','green'],
    // bar:{groupWidth:"100%"},
    legend:{
      textStyle:{
        fontName: 'Arial',
        fontSize: 18,
        bold: true,
        italic: true
      },
      position:'top',
      alignment:'end'
    }
  };

  fetchSalesByYear(){
    this.chartService.fetchSalesByYear().subscribe((value)=>{
      this.yearSalesData=value
      console.log(value)
    })
  }

  stateSalesData:any
  stateChartType= ChartType.LineChart
  stateColumns=["Products","Sales"]
  stateTitle="Year wise Bika hua saman"
  stateChartOptions = {
    is3D:true,
    colors: ['blue','red','yellow','green'],
    // bar:{groupWidth:"100%"},
    legend:{
      textStyle:{
        fontName: 'Arial',
        fontSize: 18,
        bold: true,
        italic: true
      },
      position:'top',
      alignment:'end'
    }
  };


  fetchSalesByState(){
    this.chartService.fetchSalesByState().subscribe((value)=>{
      this.stateSalesData=value
      console.log(value)
    })
  }

}
