import { Component, Input, OnInit } from '@angular/core';
import { HrService } from '../hr.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-single-applicant',
  templateUrl: './single-applicant.component.html',
  styleUrls: ['./single-applicant.component.css'],
})
export class SingleApplicantComponent implements OnInit {
  id!: number | null;
  applicantDetails: any;
  applicantForm!: FormGroup;
  degreesData!: any;
  userId!: any;
  jobHistoryData!: any;
  jobHistoryDataBool!: boolean;
  degreesDataBool!: boolean;
  doc: number = 0;
  show:boolean=false;

  generateForm() {
    this.applicantForm = new FormGroup({
      round_1: new FormControl(),
      round_2: new FormControl(),
      round_3: new FormControl(),
      doc_verification: new FormControl(),
      offer_letter: new FormControl(),
    });

    this.getId();
  }

  constructor(
    private hrService: HrService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.generateForm();
  }

  patchForm() {
    this.applicantForm.patchValue({
      round_1: this.applicantDetails.round_1,
      round_2: this.applicantDetails.round_2,
      round_3: this.applicantDetails.round_3,
      doc_verification: this.applicantDetails.doc_verification,
      offer_letter: this.applicantDetails.offer_letter,
    });
  }

  getId() {
    this.route.paramMap.subscribe((params: ParamMap | null) => {
      if (params) {
        const idString = params.get('id');
        this.id = idString ? parseInt(idString, 10) : null;
        this.cookieService.set('app_id', params.get('id')!);
        this.getSingleApplicant();
      }
    });
  }

  getSingleApplicant() {
    this.hrService.getSingleApplicant(this.id).subscribe((val) => {
      this.applicantDetails = val;
      this.userId = val['user_id'];
      this.patchForm();
      this.getAllQualificationsOfApplicant();
      this.getJobHistoryOfApplicant();
      this.checkDocuments();
    });
  }

  checkDocuments() {
    this.hrService.checkDocuments(this.userId).subscribe((val) => {
      this.doc = val;
    });
  }

  updateApplication():void{
    this.hrService
      .updateApplication(this.id, this.applicantForm.value)
      .subscribe((val) => {
        this.router.navigate(['/ViewApplications']);
      });
  }

  submit() {
    this.updateApplication();
  }

  onSelected(value: string, round: string): void {
    this.applicantForm.get(round)?.setValue(value);
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }


  sendDocumentMail(): void {
    let myMap: { [key: string]: any } = {};
    myMap['email'] = this.applicantDetails.email;
    myMap['username'] = this.applicantDetails.username;

    this.hrService.sendDocumentMail(myMap).subscribe({
      next: (data) => {this.open();},
      error: (e) => {
        this.router.navigate(['/unauthorized'])
      },
    });
  }

  getAllQualificationsOfApplicant() {
    this.userId = this.applicantDetails.user_id;

    this.hrService.getQualificationsOfUser(this.userId).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.degreesDataBool = true;
        }
        this.degreesData = data;
      },
      error: (e) => {
        this.router.navigate(['/unauthorized'])
      },
    });
  }

  getJobHistoryOfApplicant() {
    this.userId = this.applicantDetails.user_id;

    this.hrService.getJobHistoryOfUser(this.userId).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.jobHistoryDataBool = true;
        }
        this.jobHistoryData = data;
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }
}
