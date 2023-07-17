import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertList } from '../model/alert-list';
import { Observable } from 'rxjs';


const alertsData = '../../../../assets/json/alerts-data.json';

@Injectable({
  providedIn: 'root'
})
export class AlertListService {

  constructor(private http: HttpClient) { }

  getWellAlerts(): Observable<AlertList[]> {
    return this.http.get<AlertList[]>(alertsData);
  }

}
