import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {ParameterGraphModel } from 'src/app/modules/feature/model/parameterGraphModel';


@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  yesterdayCycleCountJson = '../../../../assets/json/yesterday-cycle-count-data.json';
  yesterdayCycleCountBarJson = '../../../../assets/json/yesterday-cycle-count-bar-data.json'
  CounterJsonUrl='../../../../assets/json/cyclecounter.json';
  runtimeJsonUrl='../../../../assets/json/cycleruntime.json';
  constructor(private http: HttpClient) { }

  getYesterdayCycleCountData(): Observable<any>{
    return this.http.get(this.yesterdayCycleCountJson);
  }

  getYesterdayCycleCountBarData(): Observable<any>{
    return this.http.get(this.yesterdayCycleCountBarJson);
  }

  GetCycleCounter(): Observable<ParameterGraphModel[]> {   
    return this.http.get<ParameterGraphModel[]>(this.CounterJsonUrl);          
  }

  GetCycleRun(): Observable<ParameterGraphModel[]> {   
    return this.http.get<ParameterGraphModel[]>(this.runtimeJsonUrl);          
  }
  
}
