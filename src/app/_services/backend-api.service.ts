import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class BackendApiService {
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
  }

  getDataList(page: any, limit: any): Observable<HttpResponse<any>> {
    let params = new HttpParams();
    params = params.set('_page', page);
    params = params.set('_limit', limit);
    return this.httpClient.get(environment.apiUrl, {
      headers: this.headers,
      params: params, observe: 'response'
    });
  }

  deleteItem(id: any): Observable<HttpResponse<any>> {
    return this.httpClient.delete(environment.apiUrl + '/' + id, {
      headers: this.headers, observe: 'response'
    });
  }

  addItem(jsonData): Observable<HttpResponse<any>> {
    return this.httpClient.post(environment.apiUrl, jsonData, {
      headers: this.headers, observe: 'response'
    });
  }

  updateItem(id, jsonData): Observable<HttpResponse<any>> {
    return this.httpClient.put(environment.apiUrl + '/' + id, jsonData, {
      headers: this.headers, observe: 'response'
    });
  }
}
