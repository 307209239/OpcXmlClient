import { OpcList } from "./OpcList";
import { OpcObject } from "./OpcObject";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class  OpcObjectList extends OpcList{
    IsObjectList=true
    AppendItemById(id:string):void{
        new OpcObject(this.Docment,null, "__listItem", this).SetObjectId(id);
    }
    GetItemByName(name:string):OpcXmlElement|null{
       let items=  this.GetListItems();
       items.forEach(element => {
           if(element.FindChildByName("__name")?.GetValue()==name)
           return element
       });
       return null

    }

}