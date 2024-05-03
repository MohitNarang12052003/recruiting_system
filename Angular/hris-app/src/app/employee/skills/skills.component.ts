import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { CookieService } from 'ngx-cookie-service';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillsData!:any;
  skillForm!:FormGroup;
  display!:any;
  show!:boolean
  openToast(){
    this.show=true;
    console.log(this.display)
  }

	closeToast() {
		this.show = false;
    this.display=0;
	}


  constructor(private employeeService:EmployeeService,private cookieService:CookieService){}
  ngOnInit(){
    this.fetchSkillsData();
  }

  fetchSkillsData(){
    this.employeeService.getSkills().subscribe({
      next:(data)=>{
        this.skillsData=data;
        console.log(data)
      },
      error:(error)=>{
        console.log("error",error);
      }
    })
  }

  skillFormFn(){
    this.skillForm=new FormGroup({
      skill:new FormControl()
    })

  }

    private modalService = inject(NgbModal);

    open(content: TemplateRef<any>) {
      this.skillFormFn();

      this.modalService.open(content).result.then(
        (result) => {
          this.addSkillFn();

          
          console.log("result",result)
        },
        (reason) => {
          this.openToast();
              this.display=3;
          // alert("No new Skill Added")
        },
      );
    }


    addSkillFn():void{
      const newSkill=this.skillForm.get("skill")?.value;
          this.employeeService.addSkill(newSkill).subscribe({
            next:(data)=>{
              this.fetchSkillsData();
              this.openToast();
              this.display=1;
              // alert("An assessment will be scheduled soon for your new acquired skill. We highly appreciate your interest towards upskilling yourself");
              console.log(data)
            },
            error:(error)=>{
              this.openToast();
              this.display=2;
              // alert("Skill could not get added")
              console.log("error",error)
            }
          })

    }

   
}
