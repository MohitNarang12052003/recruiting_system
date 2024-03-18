import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-original-documents',
  templateUrl: './original-documents.component.html',
  styleUrls: ['./original-documents.component.css']
})
export class OriginalDocumentsComponent implements OnInit{
  constructor(private cookieService:CookieService,private router:Router){ }
  ngOnInit(){
    if(this.cookieService.get("role")!=="-1"){
      this.router.navigate(["/login"]);
    }
  }

}
