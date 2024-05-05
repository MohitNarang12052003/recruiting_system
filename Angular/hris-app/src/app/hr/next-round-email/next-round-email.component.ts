import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HrService } from '../hr.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-next-round-email',
  templateUrl: './next-round-email.component.html',
  styleUrls: ['./next-round-email.component.css'],
})
export class NextRoundEmailComponent {
  id!: any;
  applicantDetails!: any;
  currentRound!: number;
  nextRoundForm!: FormGroup;
  show: boolean = false;
  display!: any;
  
  
  constructor(
    private route: ActivatedRoute,
    private hrService: HrService,
    private router: Router,
    private calendar: NgbCalendar
  ) {
    // this.minDate = this.calendar.getToday(); // Set minimum date to today
    // this.selectedDate = this.calendar.getToday(); 
  }
  ngOnInit() {
    this.getId();
    this.nextRoundDetails();
  }

  nextRoundDetails(): void {
    this.nextRoundForm = new FormGroup({
      email: new FormControl(),
      uname: new FormControl(),
      number: new FormControl(),
      date: new FormControl(),
      place: new FormControl(),
      time: new FormControl(),
    });
  }

  // minDate!: NgbDate; 
  // selectedDate!: NgbDate;

  // onDateSelect(event:any) {
  //   this.selectedDate = event.next;
  //   this.nextRoundForm.get('date')?.setValue(this.selectedDate);
  //   console.log('Selected Date:', this.selectedDate);
  // }

  openToast() {
    this.show = true;
  }

  closeToast() {
    this.show = false;
    this.display = 0;
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
        this.currentRound = 1;
        if (this.applicantDetails.round_1 === 'Pass') {
          this.currentRound = 2;
        }

        if (this.applicantDetails.round_2 === 'Pass') {
          this.currentRound = 3;
        }
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  sendRoundMail(): void {
    
    this.hrService.sendRoundMail(this.nextRoundForm.value).subscribe({
      next: (data) => {
        this.openToast();
        this.display = 1;
      },
      error: (e) => {
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  submit() {
    this.nextRoundForm.patchValue({
      email: this.applicantDetails.email,
      uname: this.applicantDetails.username,
      number: this.currentRound,
    });

    this.sendRoundMail();
  }
}
