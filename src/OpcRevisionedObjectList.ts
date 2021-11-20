import { OpcObjectList } from "./OpcObjectList ";
import { OpcRevisionedObject } from "./OpcRevisionedObject";
import { XmlHelper } from "./XmlHelper";

export class OpcRevisionedObjectList extends OpcObjectList {
    IsRevisionedObjectList = true
    /**
     * 添加
     * @param name 
     * @param rev 版本  不赋值时 使用默认版本
     * @returns 
     */
    AppendItem(name:string,rev:string=""): OpcRevisionedObject {
          let el=new OpcRevisionedObject(this.Docment,null,"__listItem",this)
          el.SetAttribute("__listItemAction","add")
          el.SetRef(name,rev)

          return el;
    }
    /**
     * 删除
     * @param name 
     * @param rev 版本  不赋值时 使用默认版本
     */
    DeleteItemByRef(name:string,rev:string=""):void{
        let el=new OpcRevisionedObject(this.Docment,null,"__listItem",this)
          el.SetAttribute("__listItemAction","delete")
          XmlHelper.SetValue2(el,"__key","__name",name)
          XmlHelper.SetValue2(el,"__key","__rev",rev)
          XmlHelper.SetValue2(el,"__key","__name",rev.length==0?"true":"false")

    }
     /**
     * 更新
     * @param name 
     * @param rev 版本  不赋值时 使用默认版本
     */
      ChangeItemByRef(name:string,rev:string=""):OpcRevisionedObject{
        let el=new OpcRevisionedObject(this.Docment,null,"__listItem",this)
          el.SetAttribute("__listItemAction","change")
          XmlHelper.SetValue2(el,"__key","__name",name)
          XmlHelper.SetValue2(el,"__key","__rev",rev)
          XmlHelper.SetValue2(el,"__key","__name",rev.length==0?"true":"false")
          return el
    }
}