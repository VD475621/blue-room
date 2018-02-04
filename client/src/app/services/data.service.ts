import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { makeDecorator } from '@angular/core/src/util/decorators';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  GetData (url: string) : Observable<any> {
    return this.http.get(url).map(resp => resp as any);
  }

  PostData (url: string, body: any) : Observable<any> {
    return this.http.post(url, body).map(resp => resp as any);
  }

  PutData (url: string, body: any) : Observable<any> {
    return this.http.put(url, body).map(resp => resp as any);
  }

  DeleteData (url: string): Observable<any> {
    return this.http.delete(url).map( resp => resp as any);
  }
}