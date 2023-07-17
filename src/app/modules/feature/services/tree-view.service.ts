import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {Node,NodeType, SavedState} from './models'


@Injectable({
  providedIn: 'root'
})
export class TreeViewService {
  public selectedNodes : BehaviorSubject<Node[]> = new BehaviorSubject<Node[]>([]);

  private savedState:SavedState[] = [];
  savedStateEmit :BehaviorSubject<SavedState[]> = new BehaviorSubject<SavedState[]>(this.savedState);
  selectedSavedTreeStateEvent:BehaviorSubject<{state:SavedState| null,fresh:boolean}> = new BehaviorSubject<{state:SavedState| null,fresh:boolean}>({state:null,fresh:false});
  key:string = "saved-tree-search-state";

  
  public setSelectedSavedTreeState(v : SavedState | null,fresh:boolean = false) {
    this.selectedSavedTreeStateEvent.next({fresh:fresh,state:v});
  }
  
  
  constructor() { 
    this.GetAllSavedState();
  }

  GetAllSavedState():SavedState[]{
    var data = localStorage.getItem(this.key);
    if(data != null && data != undefined && data.trim() != "")
    {
      this.savedState = JSON.parse(data);
      this.savedStateEmit.next(this.savedState);
    }
    return this.savedState;
  }
  SaveState(state:SavedState)
  {
    this.savedState.push(state);
    localStorage.setItem(this.key,JSON.stringify(this.savedState));
    this.savedStateEmit.next(this.savedState);
    this.setSelectedSavedTreeState(state);
  }
}
