import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class BackendApiService {
  // The headers of request to send to backend
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
  }

  /**
   * Send request to get list of data for one page
   * @param page Page number (start from 1)
   * @param limit Page size
   */
  getDataList(page: any, limit: any): Observable<HttpResponse<any>> {
    let params = new HttpParams();
    params = params.set('_page', page);
    params = params.set('_limit', limit);
    return this.httpClient.get(environment.apiUrl, {
      headers: this.headers,
      params: params, observe: 'response'
    });
  }

  /**
   * Send request to delete an item
   * @param id Id of deleted item
   */
  deleteItem(id: any): Observable<HttpResponse<any>> {
    return this.httpClient.delete(environment.apiUrl + '/' + id, {
      headers: this.headers, observe: 'response'
    });
  }

  /**
   * Send request to add a new item
   * @param jsonData The json body, which contains information of added item
   */
  addItem(jsonData): Observable<HttpResponse<any>> {
    return this.httpClient.post(environment.apiUrl, jsonData, {
      headers: this.headers, observe: 'response'
    });
  }

  /**
   * Send request to update an item
   * @param id Id of the updated item
   * @param jsonData The json body, which contains information of updated item
   */
  updateItem(id, jsonData): Observable<HttpResponse<any>> {
    return this.httpClient.put(environment.apiUrl + '/' + id, jsonData, {
      headers: this.headers, observe: 'response'
    });
  }
}
