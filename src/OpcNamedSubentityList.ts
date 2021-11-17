import { OpcNamedSubentity } from "./OpcNamedSubentity";
import { OpcObjectList } from "./OpcObjectList ";

export class OpcNamedSubentityList extends OpcObjectList{
    IsNamedSubentityList=true
    AppendItem(name:string):OpcNamedSubentity{
        let el=new OpcNamedSubentity(this.Docment,null,"__listItem",this)
        el.DomElement.setAttribute("__listItemAction","add")
        el.SetName(name)
        return el
    }
    DeleteItemByName(name:string):void{
        let el=new OpcNamedSubentity(this.Docment,null,"__listItem",this)
        el.DomElement.setAttribute("__listItemAction","delete")
        let key=new OpcNamedSubentity(this.Docment,null,"__key",el)
        key.SetName(name)
       
    }
}