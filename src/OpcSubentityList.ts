import { OpcObjectList } from "./OpcObjectList ";
import { OpcSubentity } from "./OpcSubentity";
import { XmlHelper } from "./XmlHelper";

export class OpcSubentityList extends OpcObjectList{
    IsSubentityList=true
    AppendItem():OpcSubentity{
        let el=new OpcSubentity(this.Docment,null,"__listItem",this)
        el.SetAttribute("__listItemAction","add")
        return el

    }
    ChangeItemByIndex(index:number):OpcSubentity{
        let el=new OpcSubentity(this.Docment,null,"__listItem",this)
        el.SetAttribute("__listItemAction","change")
        XmlHelper.SetValue(el,"__index",index.toString())
        return el
    }
    GetItemByIndex(index:number):OpcSubentity{
        let el= super.GetItemByIndex(index);
        return new OpcSubentity(this.Docment,el.DomElement)
    }
}