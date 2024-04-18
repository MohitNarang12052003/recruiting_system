import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private httpClient:HttpClient) { }

  fetchSalesByProduct():Observable<any>{
    return this.httpClient.get("http://localhost:8080/api/fetchSalesByProduct");
  }

  fetchSalesByYear():Observable<any>{
    return this.httpClient.get("http://localhost:8080/api/fetchSalesByYear");
  }

  fetchSalesByState():Observable<any>{
    return this.httpClient.get("http://localhost:8080/api/fetchSalesByState");
  }

}
