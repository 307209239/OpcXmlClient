import { add } from "lodash";
import { OpcContainer } from "./OpcContainer";
import { OpcObjectList } from "./OpcObjectList ";

export class OpcContainerList extends OpcObjectList{
    IsContainerList:boolean=true
    AppendItem(name:string,level:string=""):OpcContainer{
        let item=new OpcContainer(this.Docment,null,"__listItem",this)
        item.DomElement.setAttribute("__listItemAction","add")
        item.SetRef(name,level)
        return item

    }
    DeleteItem(name:string,level:string=""):void{
        let item=new OpcContainer(this.Docment,null,"__listItem",this)
        item.DomElement.setAttribute("__listItemAction","delete")
        let el=new  OpcContainer(this.Docment,null,"__key",item)
        el.SetRef(name)
       
    }
    
}