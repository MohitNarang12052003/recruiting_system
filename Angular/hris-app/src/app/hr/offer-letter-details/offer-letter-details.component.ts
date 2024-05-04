import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-offer-letter-details',
  templateUrl: './offer-letter-details.component.html',
  styleUrls: ['./offer-letter-details.component.css'],
})
export class OfferLetterDetailsComponent implements OnInit {
  offerLetterForm!: FormGroup;
  applicantDetails!: any;
  id!: any;
  selectedType = '';
  show: boolean = false;
  display!: any;

  constructor(
    private route: ActivatedRoute,
    private hrService: HrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getId();
    this.formFn();
  }

  openToast() {
    this.show = true;
  }

  closeToast() {
    this.show = false;
    this.display = 0;
  }

  onSelected(value: string): void {
    this.selectedType = value;
  }

  formFn(): void {
    this.offerLetterForm = new FormGroup({
      fullname: new FormControl(),
      job_title: new FormControl(),
      employmentType: new FormControl(),
      salary: new FormControl(),
      email: new FormControl(),
    });
  }

  getId(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.id = id;

      this.getApplicantDetails();
    });
  }

  getApplicantDetails(): void {
    this.hrService.getSingleApplicant(this.id).subscribe({
      next: (data) => {
        this.applicantDetails = data;

        this.patchValues();
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  patchValues(): void {
    this.offerLetterForm.patchValue({
      fullname: this.applicantDetails.full_name,
      email: this.applicantDetails.email,
    });
  }

  offerLetterMail(): void {
    this.hrService.offerLetterMail(this.offerLetterForm.value).subscribe({
      next: (data) => {
        this.openToast();
        this.display = 1;
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  submit(): void {
    this.offerLetterForm.get('employmentType')?.setValue(this.selectedType);

    this.offerLetterMail();
  }
}
