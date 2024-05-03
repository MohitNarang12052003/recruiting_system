import { Component, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
})
export class AddJobComponent implements OnInit {
  isDone: number = 0;
  isFilled: number = 0;
  show:boolean = false;
  display!:any;
  jobTitle!:any;
  openToast(){
    this.show=true;
    console.log(this.display)
  }

	closeToast() {
		this.show = false;
    this.display=0;
    this.router.navigate(['HR']);
	}

  constructor(
    private hrService: HrService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  add() {
   
      this.isDone = 1; 
    
           
  }
  
  selectedType = '';
  deptSelectedType='';

  onSelected(value: string): void {
    this.selectedType = value;
  }

  onDeptSelected(value: string): void {
    this.deptSelectedType = value;
  }

  createForm = new FormGroup({
    jobTitle: new FormControl(),
    jobDescription: new FormControl(),
    minQualification: new FormControl(),
    keyRole: new FormControl(),
    employmentType: new FormControl(),
    location: new FormControl(),
    departmentName: new FormControl(),
    skills: new FormControl(),
    hrid: new FormControl(),
  });

  submit() {

    if(this.isDone==0){
      this.isDone = 1; 
    }
    else{
      this.createForm.get('employmentType')?.setValue(this.selectedType);
      this.createForm.get('departmentName')?.setValue(this.deptSelectedType);
      this.createForm
        .get('hrid')
        ?.setValue(parseInt(this.cookieService.get('hr_id')));

      console.log(this.createForm.value)
      this.hrService.postJob(this.createForm.value).subscribe((data) => {
        this.openToast();
        this.display=1;
        this.jobTitle=this.createForm.get("jobTitle")?.value;
        // alert(
        //   'Successfully Posted ' + this.createForm.get("jobTitle")?.value + ' Vacancy'
        // );
        
      });

    }


    
  }


  backFn(){
    this.isDone=0;
  }
}
