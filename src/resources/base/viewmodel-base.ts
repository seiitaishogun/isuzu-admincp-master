 
import { Filter } from "./filter-base";

export interface ViewModelBase {
  items: Array<any>
  selectedItem: any
  selectedList: Array<any>
  filter: any
  runFilter()
  runCreate(item)
  runUpdate(item)
  runDelete(id)
  runDeleteMany(ids)
}
export interface AureliaList extends ViewModelBase {
  itemsCount : number;
  asyncTask : any; 
  activate(params, routeConfig, navigationInstruction)
  paginationChanged(event)
}
