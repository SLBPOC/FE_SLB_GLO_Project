import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl, NestedTreeControl, NestedTreeControlOptions } from '@angular/cdk/tree';
import { Component, Injectable, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { TreeViewService } from '../../../services/tree-view.service';
import { Node, NodeType, FlatNode } from '../../../services/models'


/**
 * Node for to-do item
 */
// export class TodoItemNode {
//   children: TodoItemNode[];
//   item: string;
// }

/** Flat to-do item node with expandable and level information */
// export class TodoItemFlatNode {
//   item: string;
//   level: number;
//   expandable: boolean;
// }

/**
 * The Json object for to-do list data.
 */
// const TREE_DATA = {
//   Groceries: {
//     'Almond Meal flour': null,
//     'Organic eggs': null,
//     'Protein Powder': null,
//     Fruits: {
//       Apple: null,
//       Berries: ['Blueberry', 'Raspberry'],
//       Orange: null
//     }
//   },
//   Reminders: [
//     'Cook dinner',
//     'Read the Material Design spec',
//     'Upgrade Application to Angular'
//   ]
// };



/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {

  dataChange = new BehaviorSubject<Node[]>([]);

  // TREE_DATA : {[k: string]: any} = {
  //   "Field Name 1":{
  //     "Battery Name 02-1-ii": {
  //       "Pad Name 01-xx": {
  //         "Well No 1":null,
  //         "Well No 2":null,
  //         "Well No 3":null,
  //       } ,
  //       "Pad Name 02-yy": {
  //         "Well No 1":null,
  //         "Well No 2":null,
  //         "Well No 3":null,
  //       } 
  //     }
  //   },
  //   "Field Name 2":
  //     {
  //       "Battery Name 02-1": {
  //         "Pad Name 01": {
  //           "Well No 1":null,
  //           "Well No 2":null,
  //           "Well No 3":null,
  //         } ,
  //         "Pad Name 02": {
  //           "Well No 1":null,
  //           "Well No 2":null,
  //           "Well No 3":null,
  //         } 
  //       }
  //     }
  //   ,
  //   "Field Name 3":{
  //     "Battery Name 02-1-pp": {
  //       "Pad Name 01-bb": {
  //         "Well No 1":null,
  //         "Well No 2":null,
  //         "Well No 3":null,
  //       } ,
  //       "Pad Name 02-kk": {
  //         "Well No 1":null,
  //         "Well No 2":null,
  //         "Well No 3":null,
  //       } 
  //     }
  //   }
  // }

  flatnedTree_data: Node[] = [];

  TREE_DATA: Node[] = [
    {
      Type: NodeType.Field,
      Id: 1,
      Name: 'NY Field',
    },
    {
      Type: NodeType.Field,
      Id: 2,
      Name: 'Field Name 1',
      Children: [
        {
          Type: NodeType.Battery,
          Id: 3,
          ParentId: 2,
          Name: 'Battery 1',
          Children: [
            {
              Type: NodeType.Pad,
              Id: 4,
              ParentId: 3,
              Name: 'Pad alone',
              Children: [
                {
                  Type: NodeType.Wells,
                  Id: 5,
                  ParentId: 4,
                  Name: 'Well 1-alone',
                  isOn: true
                },
                {
                  Type: NodeType.Wells,
                  Id: 6,
                  ParentId: 4,
                  Name: 'Well 2',
                  isOn: false
                }
              ]
            },
            {
              Type: NodeType.Pad,
              Id: 11,
              ParentId: 3,
              Name: 'Pad home',
              Children: [
                {
                  Type: NodeType.Wells,
                  Id: 12,
                  ParentId: 11,
                  Name: 'Well 1-home',
                  isOn: true
                },
                {
                  Type: NodeType.Wells,
                  Id: 13,
                  ParentId: 11,
                  Name: 'Well 2-home',
                  isOn: false
                }
              ]
            }
          ]
        },
        {
          Type: NodeType.Battery,
          Id: 7,
          ParentId: 2,
          Name: 'Battery 2',
          Children: [
            {
              Type: NodeType.Pad,
              Id: 8,
              ParentId: 7,
              Name: 'Pad 2-1',
              Children: [
                {
                  Type: NodeType.Wells,
                  Id: 9,
                  ParentId: 8,
                  Name: 'Well 2-2-1-home',
                  isOn: true
                },
                {
                  Type: NodeType.Wells,
                  Id: 10,
                  ParentId: 8,
                  Name: 'Well 2-2-2-alone',
                  isOn: false
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  get data(): Node[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    // const data = this.buildFileTree(this.TREE_DATA, 0);

    // Notify the change.
    this.flatnedTree_data = this.flattened(this.TREE_DATA, this.flatnedTree_data);
    this.reset();
  }

  reset() {
    this.dataChange.next(this.TREE_DATA);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  // buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
  //   return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
  //     const value = obj[key];
  //     const node = new TodoItemNode();
  //     node.item = key;

  //     if (value != null) {
  //       if (typeof value === 'object') {
  //         node.children = this.buildFileTree(value, level + 1);
  //       } else {
  //         node.item = value;
  //       }
  //     }

  //     return accumulator.concat(node);
  //   }, []);
  // }

  /** Add an item to to-do list */
  // insertItem(parent: TodoItemNode, name: string) {
  //   if (parent.children) {
  //     parent.children.push({ item: name } as TodoItemNode);
  //     this.dataChange.next(this.data);
  //   }
  // }

  // updateItem(node: TodoItemNode, name: string) {
  //   node.item = name;
  //   this.dataChange.next(this.data);
  // }

  searchFields(searchText: string) {
    var searchData = this.TREE_DATA.filter(x => this.searchName(x, searchText));
    this.dataChange.next(searchData);
  }
  searchName(x: Node, searchText: string) {
    return x.Name.toLowerCase().indexOf(searchText.toLowerCase().trim()) > -1
  }



  flattened(nodes: Node[], finalArray: Node[]) {
    finalArray = finalArray || [];
    nodes.forEach(x => {
      finalArray.push(x);
      if (x.Children != null && x.Children.length > 0)
        this.flattened(x.Children, finalArray);
    });
    return finalArray;
  }

  // prepareParentData(nodes:Node[])
  // {
  //   var allParents :Node[] = []; 
  //   nodes.forEach(x=>allParents.push(this.TREE_DATA.filter(x=>x.Id == x.ParentId)[0])) 
  // }

  searchInWells(searchText: any) {
    var wellsData = this.flatnedTree_data.filter(x => x.Type == NodeType.Wells && this.searchName(x, searchText));
    var finalData: Node[] = [];
    var batteries = new Set<Number>();
    var fields = new Set<number>();
    var pads = new Set<number>();
    wellsData.forEach(x => {
      var batteryId = this.flatnedTree_data.find(y => y.Id == x.ParentId)?.ParentId;
      pads.add(<number>x.ParentId);
      batteries.add(<number>batteryId);
    });
    batteries.forEach(x => {
      fields.add(<number>this.flatnedTree_data.find(l => l.Id == x)?.ParentId);
    })
    fields.forEach(x => {
      finalData.push(Object.assign({}, this.flatnedTree_data.find(y => y.Id == x)));
    })
    finalData.forEach(x => {
      x.Children = this.flatnedTree_data.filter(y => batteries.has(y.Id) && y.ParentId == x.Id).map(z => Object.assign({}, z));
      x.Children.forEach(m => {
        m.Children = this.flatnedTree_data.filter(k => pads.has(k.Id) && k.ParentId == m.Id).map(z => Object.assign({}, z));
        m.Children.forEach(h => {
          h.Children = wellsData.filter(xo => xo.ParentId == h.Id).map(z => Object.assign({}, z));
        })
      })
    });
    this.dataChange.next(finalData);
  }

  searchInPads(searchText: any) {
    var padsData = this.flatnedTree_data.filter(x => x.Type == NodeType.Pad && this.searchName(x, searchText));
    var finalData: Node[] = [];
    var batteries = new Set<Number>();
    var fields = new Set<number>();
    padsData.forEach(x => {
      var fieldId = this.flatnedTree_data.find(y => y.Id == x.ParentId)?.ParentId;
      fields.add(<number>fieldId);
      batteries.add(<number>x.ParentId);
    })
    fields.forEach(x => {
      finalData.push(Object.assign({}, this.flatnedTree_data.find(y => y.Id == x)));
    })
    finalData.forEach(x => {
      x.Children = this.flatnedTree_data.filter(y => batteries.has(y.Id) && y.ParentId == x.Id).map(z => Object.assign({}, z));
      x.Children.forEach(m => {
        m.Children = padsData.filter(t => t.ParentId == m.Id).map(z => Object.assign({}, z))
      })
    });
    this.dataChange.next(finalData);
  }

  // findAllTopParent(nodes:Node[],ids:number[]){
  //   ids = ids || [];
  //   nodes.forEach(x=>
  //     {
  //       if(x.ParentId == null || x.ParentId == 0 || x.ParentId == undefined)
  //         ids.push(<number>x.ParentId);
  //       else
  //         this.findAllTopParent(this.flatnedTree_data.filter(y=>y.Id == x.ParentId),ids);
  //     })
  //   return ids;
  // }


  searchInBattery(searchText: any) {
    var searchData = this.flatnedTree_data.filter(x => x.Type == NodeType.Battery && this.searchName(x, searchText));
    var finalData: Node[] = [];
    var fields = new Set<number | undefined>();
    searchData.map(x => x.ParentId).forEach(x => {
      if (!fields.has(x)) {
        finalData.push.apply(finalData,
          this.TREE_DATA.filter(y => y.Id == x).map(z => Object.assign({}, z))
        )
        fields.add(x);
      }
    })
    finalData.forEach(x => {
      x.Children = searchData.filter(y => y.ParentId == x.Id).map(z => Object.assign({}, z));
    });
    this.dataChange.next(finalData);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'well-tree-view',
  templateUrl: 'well-tree-view.component.html',
  styleUrls: ['well-tree-view.component.css'],
  providers: [ChecklistDatabase]
})
export class WellTreeView implements OnChanges {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  // flatNodeMap = new Map<FlatNode, Node>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  // nestedNodeMap = new Map<Node, FlatNode>();

  /** A selected parent node to be inserted */
  // selectedParent: Node | null = null;

  /** The new item's name */
  // newItemName = '';

  treeControl: NestedTreeControl<Node>;

  // treeFlattener: MatTreeFlattener<Node, FlatNode>;

  dataSource: MatTreeNestedDataSource<Node>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<number>(true);

  constructor(private database: ChecklistDatabase, public treeviewService: TreeViewService) {
    // this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
    //   this.isExpandable, this.getChildren);
    this.treeControl = new NestedTreeControl<Node>(x => x.Children);
    this.dataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
      this.treeControl.dataNodes = data;
      this.treeControl.expandAll();
    });
    this.checklistSelection.changed.subscribe(x => {
      treeviewService.selectedNodes.next(this.database.flatnedTree_data.filter(y => this.checklistSelection.selected.some(z => z == y.Id)));
    });

    this.treeviewService.selectedSavedTreeStateEvent.subscribe(x => {
      if (x.state != null && x.fresh) {
        this.checklistSelection.clear();
        // setTimeout(() => {
        this.UpdateTreeSelection(<Node[]>x?.state?.SelectedNode);
        // }, 500); 
      }
      else if (x.state == null) {
        this.checklistSelection.clear();
      }
    })
  }

  UpdateTreeSelection(nodes: Node[]) {
    var nodes1 = <Node[]>this.database.flatnedTree_data.filter(x => nodes.some(y => y.Id == x.Id))
    nodes1.forEach(x =>
      this.checklistSelection.select(x.Id));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchObj != undefined && this.searchObj.searchText != undefined && this.searchObj.searchText.trim() != '')
      this.searchData();
    else {
      this.database.reset();
    }
  }

  searchData() {
    if (this.searchObj.option == "fields")
      this.database.searchFields(this.searchObj.searchText);
    else if (this.searchObj.option == "battery")
      this.database.searchInBattery(this.searchObj.searchText);
    else if (this.searchObj.option == "pads")
      this.database.searchInPads(this.searchObj.searchText);
    else if (this.searchObj.option == "wells")
      this.database.searchInWells(this.searchObj.searchText);
  }


  notWellNode(node: FlatNode) {
    return (node.Type == NodeType.Field || node.Type == NodeType.Pad || node.Type == NodeType.Battery);
  }

  isCheckbox(node: FlatNode) {
    return node.Type == NodeType.Pad || node.Type == NodeType.Wells;
  }

  @Input()
  searchObj: any;

  // getLevel = (node: FlatNode) => node.level;

  // isExpandable = (node: FlatNode) => node.expandable;

  // getChildren = (node: Node): Node[] => node.Children ?? [];

  hasChild = (_: number, node: Node) => !(node.Children == null || node.Children == undefined ||
    (node.Children != null && node.Children.length == 0));

  // hasNoContent = (_: number, _nodeData: FlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  // transformer = (node: Node, level: number) => {
  //   const existingNode = this.nestedNodeMap.get(node);
  //   const flatNode = existingNode && existingNode.Id === node.Id
  //     ? existingNode
  //     : new FlatNode();
  //   flatNode.Id = node.Id;
  //   flatNode.level = level;
  //   flatNode.Name = node.Name;
  //   flatNode.Type = node.Type;
  //   flatNode.isOn = node.isOn;
  //   flatNode.expandable = !(node.Children == null || node.Children == undefined ||
  //   (node.Children != null && node.Children.length == 0));
  //   this.flatNodeMap.set(flatNode, node);
  //   this.nestedNodeMap.set(node, flatNode);
  //   return flatNode;
  // }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: Node): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child.Id)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: Node): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child.Id));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: Node): void {
    this.checklistSelection.toggle(node.Id);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node.Id)
      ? this.checklistSelection.select(...(descendants.map(x => x.Id)))
      : this.checklistSelection.deselect(...descendants.map(x => x.Id));

    // // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child.Id)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: Node): void {
    this.checklistSelection.toggle(node.Id);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: Node): void {
    let parent: Node | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: Node): void {
    const nodeSelected = this.checklistSelection.isSelected(node.Id);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child.Id)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node.Id);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node.Id);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: Node): Node | null {
    // const currentLevel = this.getLevel(node);

    // if (currentLevel < 1) {
    //   return null;
    // }

    // const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    // for (let i = startIndex; i >= 0; i--) {
    //   const currentNode = this.treeControl.dataNodes[i];


    //   if (this.getLevel(currentNode) < currentLevel) {
    //     return currentNode;
    //   }
    // }
    return <Node | null>this.database.flatnedTree_data.find(x => x.Id == node.ParentId);
  }

  /** Select the category so we can insert the new item. */
  // addNewItem(node: TodoItemFlatNode) {
  //   const parentNode = this.flatNodeMap.get(node);
  //   this.database.insertItem(parentNode!, '');
  //   this.treeControl.expand(node);
  // }

  // /** Save the node to database */
  // saveNode(node: TodoItemFlatNode, itemValue: string) {
  //   const nestedNode = this.flatNodeMap.get(node);
  //   this.database.updateItem(nestedNode!, itemValue);
  // }
}