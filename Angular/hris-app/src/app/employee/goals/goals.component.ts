import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit{
 
  goalForm!:FormGroup;
  goalsData!:any;
  singleGoalData!:any;

  constructor(private employeeService:EmployeeService,private cookieService:CookieService){}
  show:boolean = false;
  display!:any;

  openToast(){
    this.show=true;
    console.log(this.display)
  }

	closeToast() {
		this.show = false;
    this.display=0;
	}

  ngOnInit(){
    this.fetchGoalsFn();
  }

  fetchGoalsFn(){
    this.employeeService.fetchGoals().subscribe({
      next:(data)=>{
        console.log(data);
        this.goalsData=data
      },
      error:(e)=>{
        console.log("Error",e);
      }
    })
  }


  goalFormFn(){
    this.goalForm=new FormGroup({
      goal_id:new FormControl(),
      goal_title:new FormControl(),
      goal_description:new FormControl()
    })
  }

  addGoalFn(){
    this.employeeService.addGoal(this.goalForm.value).subscribe({
      next:(data)=>{
        console.log(data);
        this.fetchGoalsFn();
  
      },
      error:(e)=>{
        console.log("error",e);
      }
    })
  }

  deleteGoalFn(goal_id:any){
    this.employeeService.deleteGoal(goal_id).subscribe({
      next:(data)=>{
        console.log(data);
        this.fetchGoalsFn();
      },
      error:(e)=>{
        console.log("error",e);
      }
    })
  }


  updateGoalFn():void{
      this.employeeService.updateGoal(this.goalForm.value).subscribe({
        next:(data)=>{
          console.log(data)
          this.fetchGoalsFn();
  
        },
        error:(e)=>{
          console.log("error",e);
        }
      })
  }

  prefillFn():void{
    this.goalForm.patchValue({
      goal_id:this.g_id,
      goal_title:this.singleGoalData.title,
      goal_description:this.singleGoalData.description
    });
  }

  getSingleGoalData():void{
    this.employeeService.singleGoalData(this.g_id).subscribe({
      next:(data)=>{
        this.singleGoalData=data;
        console.log(data)

        this.prefillFn();
      },
      error:(e)=>{
        console.log("error",e);
      }
    })
  }


  private modalService = inject(NgbModal);
  g_id!:number
  open(content: TemplateRef<any>,goal_id?:number) {
    this.goalFormFn();

    if(goal_id!==undefined){
      this.g_id=goal_id;
      this.getSingleGoalData();
      
   

      this.modalService.open(content).result.then(
        (result) => {
         
          this.updateGoalFn();
        
  
          
          console.log("result",result)
        },
        (reason) => {
          
          
          console.log("D",this.display)
          // alert("No Edits Made.")
          this.openToast();
          this.display=2;
          
        },
      );


      console.log("D",this.display)

    }

    
     else{
      this.modalService.open(content).result.then(
        (result) => {
         
          this.addGoalFn();
        
  
          
          console.log("result",result)
        },
        (reason) => {
          // alert("No new Goal Added")
          this.openToast();
          this.display=1
        },
      );
     }
    }
  

}
