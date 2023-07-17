export enum NodeType {
    Field,
    Battery,
    Pad,
    Wells
  }
  
  export class Node {
    Type: NodeType;
    Name: string;
    Children?: Node[];
    isOn?: boolean;
    Id: number;
    ParentId?: number;
    
  }
  
  export class FlatNode {
    Type: NodeType;
    Name: string;
    isOn?: boolean;
    Id: string;
    level: number;
    expandable: boolean;
  }

  export class SavedState{
    Name:string;
    SelectedNode:Node[];
    SavedText:string;
    SavedOption:string;
  }