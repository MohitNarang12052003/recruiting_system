import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css'],
})
export class ViewDocumentsComponent implements OnInit {
  specify: string[] = ['aadhar', 'pan', 'voter'];
  userid!: any;
  appid!: any;
  pdfSrc!: string;
  safePdfSrc!: SafeResourceUrl;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router:Router,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getIds();
  }

  getIds():void{
    this.appid = this.cookieService.get('app_id');
    this.route.paramMap.subscribe((params: ParamMap | null) => {
      this.userid = params?.get('id');
    });
  }

  

  fetchPdf(folder: string): void {
    const url = `http://localhost:8083/api/GetFiles/${this.userid}/${folder}`;
    this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
      (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        this.pdfSrc = window.URL.createObjectURL(blob);
        this.safePdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.pdfSrc
        );
      },
      (error: any) => {
        this.router.navigate(['/unauthorized']);
      }
    );
  }
}
