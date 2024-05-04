import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-original-documents',
  templateUrl: './original-documents.component.html',
  styleUrls: ['./original-documents.component.css'],
})
export class OriginalDocumentsComponent implements OnInit {
  part1 = true;
  show: boolean = false;
  display!: any;
  url!: any;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private userService: UsersService
  ) {}
  ngOnInit() {
    if (this.cookieService.get('role') !== '-1') {
      this.router.navigate(['/login']);
    }
  }
  createForm = new FormGroup({
    aadhar: new FormControl(),
    pan: new FormControl(),
    voter: new FormControl(),
    esign: new FormControl(),
    ifsc_code: new FormControl(),
    account_no: new FormControl(),
    passport_no: new FormControl(),
    name_of_acc_holder: new FormControl(),
    user_id: new FormControl(),
  });

  openToast() {
    this.show = true;
  }

  closeToast() {
    this.show = false;
    this.display = 0;
  }

  insertDocumentsFn(): void {
    this.userService
      .insertDocuments(this.createForm.value)
      .subscribe((data) => {
        this.openToast();
        this.display = 1;
      });
  }

  submit() {
    if (this.part1 == true) {
      this.part1 = false;
    } else {
      this.createForm
        .get('user_id')
        ?.setValue(parseInt(this.cookieService.get('user_id')));
      this.insertDocumentsFn();
    }
  }
  read(event: any, name: string) {
    this.url = event.target.files[0];
    this.createForm.patchValue({
      [name]: event.target.files[0].name,
    });
    this.userService
      .uploadFile(this.url, name, this.cookieService.get('user_id'))
      .subscribe((data) => {});
  }
}
