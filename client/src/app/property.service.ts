import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Property} from './property';
import { Observable,   } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  readonly ROOT_URL = 'http://localhost:8081/api';

  getProperties(): Observable<Property[]>
  {
    return this.http.get<Property[]>(this.ROOT_URL + '/getproperties');
  }

  addProperties(neProperty:Property): Observable<any>
  {
    return this.http.post<any>(this.ROOT_URL + '/addproperty', neProperty);
  }

  deleteProperty(id:any): Observable<any>
  {
    return this.http.delete<any>(this.ROOT_URL + '/deleteproperty/' + id);
  }

  updateProperty(id:any, updatedProperty:Property): Observable<any>
  {
    return this.http.put<any>(this.ROOT_URL + '/updateproperty/' + id, updatedProperty);
  }

  getMostValuableProperty(): Observable<Property[]>
  {
    return this.http.get<Property[]>(this.ROOT_URL + '/getmostvaluableproperty');
  }

  sortGreatestMonthlyIncome(): Observable<Property[]>
  {
    return this.http.get<Property[]>(this.ROOT_URL + '/getmonthlyincomedescending');
  }


}
