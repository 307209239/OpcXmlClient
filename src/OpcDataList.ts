import { OpcDataField } from "./OpcDataField";
import { OpcList } from "./OpcList";

export class OpcDataList extends OpcList{
    IsDataList=true
    AppendItem(val:string){
        let item=new OpcDataField(this.Docment,null,"__listItem",this)
        item.DomElement.setAttribute("__listItemAction","add")
        item.SetValue(val)
    }
    DeleteItemByValue(val:string){
        let item=new OpcDataField(this.Docment,null,"__listItem",this)
        item.DomElement.setAttribute("__listItemAction","delete")
        item.SetValue(val)
    }
}