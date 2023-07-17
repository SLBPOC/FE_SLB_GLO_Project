import {AfterViewInit, Component, EventEmitter, Input, Output, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DateRange } from '@angular/material/datepicker';
import { FormBuilder } from '@angular/forms';

import { AlertListService } from '../../services/alert-list.service';
import { AlertList } from '../../model/alert-list';
import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  status: string;
  well_name: String;
  pump_status: String;
  time_data: number;
  structural_load: string;
  avg_hrs:number;
  infered_prod:number;
  pump_fillage:number;
  mode_operation:number;
  stat:number;

  
}

const ELEMENT_DATA: PeriodicElement[] = [
  { status:'high', well_name: 'Apache1', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '30%',avg_hrs:1, infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'low', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '60%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'med', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '10%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'high', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '50%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'low', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '90%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'high', well_name: 'Apache1', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '30%',avg_hrs:1, infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'low', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '60%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'med', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '10%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'high', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '50%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1},
  { status:'low', well_name: 'Apache2', pump_status : 'Hydrogen', time_data: 1.0079, structural_load: '90%',avg_hrs:1,infered_prod:1,pump_fillage:1, mode_operation:1, stat:1}
  // {status:'', well_name: 2, 'Pump Status': 'Helium', weight: 4.0026, symbol: 'He'},
  // {status:'', well_name: 3, 'Pump Status': 'Lithium', weight: 6.941, symbol: 'Li'},
  // {status:'', well_name: 4, 'Pump Status': 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {status:'', well_name: 5, 'Pump Status': 'Boron', weight: 10.811, symbol: 'B'},
  // {status:'', well_name: 6, 'Pump Status': 'Carbon', weight: 12.0107, symbol: 'C'},
  // {status:'', well_name: 7, 'Pump Status': 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {status:'', well_name: 8, 'Pump Status': 'Oxygen', weight: 15.9994, symbol: 'O'},
  
];

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent {
  wellList!: AlertList[];
  dataSource: any;
  displayedColumns: string[] = ["stat", "wellName", "alertLevel", "date", "desc", "status", "action"]
  alertTypes = ["High", "Medium", "Low"];
  statuses = ["Completed", "In Progress"];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  pipe!: DatePipe;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // displayedColumns: string[] = ['status','well_name', 'pump_status', 'time_data', 'structural_load','avg_hrs','infered_prod','pump_fillage','mode_operation','stat'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private service: AlertListService ){}

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(){
    this.service.getWellAlerts().subscribe((resp) => {
      this.wellList = resp;
      this.dataSource = new MatTableDataSource<AlertList>(this.wellList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  search(data: Event){
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;

  }

  alertChange(event: any){
    let filterValue;
    filterValue = event.value.trim(); // Remove whitespace
    filterValue = event.value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  statusChange(event: any){
    let filterValue;
    filterValue = event.value.trim(); // Remove whitespace
    filterValue = event.value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectDate(date: any){
    // this.pipe = new DatePipe('en');
    // this.dataSource.filterPredicate = (data, filter) =>{
    //   if (this.fromDate && this.toDate) {
    //     return data.created >= this.fromDate && data.created <= this.toDate;
    //   }
    //   return true;
    // }
    console.log("Selelcted date range --> "+date.value)
    let fromDate = date.value.start.toISOString();
    let startDate = this.range.get('start')?.value; 
    let endDate = this.range.get('end')?.value; 
    let toDate = date.value.end.toISOString()
    this.dataSource.filterPredicate = (data: any, filter: any) =>{
      if (fromDate && toDate) {
        return data.date >= fromDate && data.date <= toDate;
      }
      return true;
    }
    this.dataSource.filter = ''+Math.random();
  }


  @Input() selectedRangeValue: DateRange<Date> | undefined;
    @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

    selectedChange(m: any) {
        if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
            this.selectedRangeValue = new DateRange<Date>(m, null);
        } else {
            const start = this.selectedRangeValue.start;
            const end = m;
            if (end < start) {
                this.selectedRangeValue = new DateRange<Date>(end, start);
            } else {
                this.selectedRangeValue = new DateRange<Date>(start, end);
            }
        }
        this.selectedRangeValueChange.emit(this.selectedRangeValue);
    }

    
    foods: Food[] = [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'},
    ];
}
