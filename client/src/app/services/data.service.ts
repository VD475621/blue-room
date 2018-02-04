import { Injectable } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  headers = new Headers();
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers})
  }

  GetData (url: string) : Observable<any> {
    return this.http.get(url, this.options).map(resp => resp.json());
  }

  PostData (url: string, body: any) : Observable<any> {
    return this.http.post(url, JSON.stringify(body), this.options).map(resp => resp.json());
  }

  PutData (url: string, body: any) : Observable<any> {
    return this.http.put(url, JSON.stringify(body), this.options).map(resp => resp.json());
  }

  DeleteData (url: string): Observable<any> {
    return this.http.delete(url, this.options).map( resp => resp.json());
  }
}