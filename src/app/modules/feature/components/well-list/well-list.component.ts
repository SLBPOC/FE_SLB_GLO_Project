import { Component } from '@angular/core';

@Component({
  selector: 'app-well-list',
  templateUrl: './well-list.component.html',
  styleUrls: ['./well-list.component.scss']
})
export class WellListComponent {
  searchObjC:any;
  userSearchChange(obj:any){
    this.searchObjC = obj;
  }


}
