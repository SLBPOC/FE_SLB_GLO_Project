import { Component } from '@angular/core';
import { CdkDragDrop,moveItemInArray } from '@angular/cdk/drag-drop';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export class DAlertsdetails {
  OilWellName!: String;
  OilWellDate!: String;
  OilWellDescription!: String;
  status!: string;
  actions!: string
}
const ELEMENT_DATA: DAlertsdetails[] = [
  { OilWellName: 'Well Name 001',OilWellDate:'2020-04-14 13:14:59',OilWellDescription:'FlatLining - Description will be seen here....', status: 'status 01',actions:'Action 01'},
  { OilWellName: 'Well Name 002',OilWellDate:'2020-04-15 13:14:59',OilWellDescription:'Tagging - Description will be seen here....', status: 'status 02',actions:'Action 02'},
  { OilWellName: 'Well Name 003',OilWellDate:'2020-04-16 13:14:59',OilWellDescription:'Mitigation - Description will be seen here....', status: 'status 03',actions:'Action 03'},
  { OilWellName: 'Well Name 004',OilWellDate:'2020-04-17 13:14:59',OilWellDescription:'Excessive Cycling', status: 'status 04',actions:'Action 04'},
  { OilWellName: 'Well Name 005',OilWellDate:'2020-04-18 13:14:59',OilWellDescription:'Erratic SPM Behaviour(sudden large changes on SPM values)', status: 'status 05',actions:'Action 05'},
  { OilWellName: 'Well Name 006',OilWellDate:'2020-04-19 13:14:59',OilWellDescription:'Excessive load anomalies(load is topic to be expand)', status: 'status 06',actions:'Action 06'},
  { OilWellName: 'Well Name 007',OilWellDate:'2020-04-20 13:14:59',OilWellDescription:'Excessive chnages on revolutions change', status: 'status 07',actions:'Action 07'},
  { OilWellName: 'Well Name 008',OilWellDate:'2020-04-21 13:14:59',OilWellDescription:'SPM or fq changes at max leel or potential above', status: 'status 08',actions:'Action 08'},
  { OilWellName: 'Well Name 009',OilWellDate:'2020-04-22 13:14:59',OilWellDescription:'Large change in production indicators ', status: 'status 09',actions:'Action 09'},
  { OilWellName: 'Well Name 010',OilWellDate:'2020-04-23 13:14:59',OilWellDescription:'FlatLining - Description will be seen here....', status: 'status 10',actions:'Action 10'},
  { OilWellName: 'Well Name 011',OilWellDate:'2020-04-24 13:14:59',OilWellDescription:'Tagging - Description will be seen here....', status: 'status 11',actions:'Action 11'},
  { OilWellName: 'Well Name 012',OilWellDate:'2020-04-25 13:14:59',OilWellDescription:'Mitigation - Description will be seen here....', status: 'status 12',actions:'Action 12'},
  { OilWellName: 'Well Name 013',OilWellDate:'2020-04-26 13:14:59',OilWellDescription:'Excessive Cycling', status: 'status 13',actions:'Action 13'},
  { OilWellName: 'Well Name 014',OilWellDate:'2020-04-27 13:14:59',OilWellDescription:'Erratic SPM Behaviour(sudden large changes on SPM values)', status: 'status 14',actions:'Action 14'},
  { OilWellName: 'Well Name 015',OilWellDate:'2020-04-28 13:14:59',OilWellDescription:'Excessive load anomalies(load is topic to be expand)', status: 'status 15',actions:'Action 15'},
  { OilWellName: 'Well Name 016',OilWellDate:'2020-04-29 13:14:59',OilWellDescription:'Excessive chnages on revolutions change', status: 'status 16',actions:'Action 16'},
  { OilWellName: 'Well Name 017',OilWellDate:'2020-04-30 13:14:59',OilWellDescription:'SPM or fq changes at max leel or potential above', status: 'status 17',actions:'Action 17'},
  { OilWellName: 'Well Name 018',OilWellDate:'2020-05-01 13:14:59',OilWellDescription:'Large change in production indicators', status: 'status 18',actions:'Action 18'},
  { OilWellName: 'Well Name 019',OilWellDate:'2020-05-02 13:14:59',OilWellDescription:'FlatLining - Description will be seen here....', status: 'status 19',actions:'Action 19'},
  { OilWellName: 'Well Name 020',OilWellDate:'2020-05-03 13:14:59',OilWellDescription:'Tagging - Description will be seen here....', status: 'status 20',actions:'Action 20'},
];

@Component({
  selector: 'app-dashboard-alerts',
  templateUrl: './dashboard-alerts.component.html',
  styleUrls: ['./dashboard-alerts.component.scss']
})
export class DashboardAlertsComponent implements OnInit {

  value = '';
  @ViewChild(MatSort,{ static: true }) matSort!: MatSort;
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  title = 'DashboradAlert';
  OildetailsList!: DAlertsdetails[];
  paginationPageSize = [10,25,50,100]
  dataList = new MatTableDataSource<any>(this.OildetailsList);
  selectedRow!: number;
  editedRows!: boolean[];
  public displayedColumns = ['OilWellName', 'OilWellDate', 'OilWellDescription','status','actions'];

  ngOnInit() {
    this.BindAllData()
  }
  BindAllData() {    
    console.log()
    this.dataList = new MatTableDataSource(ELEMENT_DATA)
    this.dataList.paginator = this.paginator;
    this.dataList.sort = this.matSort;
    console.log(this.dataList)
  }
  SearchFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataList.filter = filterValue.trim().toLowerCase();
  }
  ClearSearchBox(){
    this.value=''
    const filterValue = ""
    this.dataList.filter = filterValue.trim().toLowerCase();
  }
  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
