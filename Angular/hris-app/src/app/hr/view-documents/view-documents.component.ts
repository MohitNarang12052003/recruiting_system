import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css']
})
export class ViewDocumentsComponent implements OnInit {
specify:string[]=["aadhar","pan","voter"]
userid!:any;
appid!:any;
constructor(private cookieService:CookieService,private http: HttpClient,private router: ActivatedRoute,private sanitizer: DomSanitizer ){
  // this.userid=this.cookieService.get("user_id");
  

}
  ngOnInit(): void {
    this.appid=this.cookieService.get("app_id")
    console.log(this.cookieService.get("app_id"))
    this.router.paramMap.subscribe((params:ParamMap | null) => {
      console.log(params);
      this.userid = params?.get('id');
    console.log(this.userid);
    });
  }


pdfSrc!: string;
safePdfSrc!: SafeResourceUrl;

  
fetchPdf(folder:string): void {
const url = `http://localhost:8083/api/GetFiles/${this.userid}/${folder}`; this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
(response: ArrayBuffer) => {
  const blob = new Blob ([response], { type: 'application/pdf' });
this.pdfSrc = window.URL.createObjectURL(blob);
this.safePdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
},
  (error: any) => {
  console.error('Error fetching PDF:', error);
});

}
}
