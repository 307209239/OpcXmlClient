import { OpcDataField } from "./OpcDataField";
import { OpcNameObject } from "./OpcNameObject";
import { OpcObjectList } from "./OpcObjectList ";
import { XmlHelper } from "./XmlHelper";
export class OpcNamedObjectList extends OpcObjectList{
    IsNamedObjectList=true
    AppendItem(name:string):OpcNameObject{
        let item=new OpcNameObject(this.Docment,null,"__listItem",this)
        item.DomElement.setAttribute("__listItemAction","add")
        item.SetRef(name)
        return item
    }
    DeleteItem(name:string):void{
        let item=new OpcNameObject(this.Docment,null,"__listItem",this)
        item.DomElement.setAttribute("__listItemAction","delete")
         let el=new OpcNameObject(this.Docment,null,"__key",item)
         el.SetRef(name)
    }
    ChangeItem(oldName:string,newName:string):void{
        let item=new OpcNameObject(this.Docment,null,"__listItem",this)
        item.DomElement.setAttribute("__listItemAction","change")
         let el=new OpcNameObject(this.Docment,null,"__key",item)
         el.SetRef(oldName)
         item.SetRef(newName)
         
    }
    GetItemByName(name:string):OpcNameObject|null{
       let els= this.DomElement.getElementsByTagName("__name");
       for(let key in els){
           if(XmlHelper.GetValue(els[key])==name)
             return new OpcNameObject(this.Docment,els[key])
       }
       return null
         
    }
    
}