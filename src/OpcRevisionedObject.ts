import { OpcObject } from "./OpcObject";
import { XmlHelper } from "./XmlHelper";

export class OpcRevisionedObject extends OpcObject{
    IsRevisionedObject=true
    GetName():string{
        let el=this.FindChildByName("__name")
        return el==null?"":el.GetValue()
    }
    GetRevision():string{
        let el=this.FindChildByName("__rev")
        return el==null?"":el.GetValue()
    }
    GetUseROR():boolean{
        let el=this.FindChildByName("__rev")
        return el==null?false:el.GetValue()=="true"
    }
    /**
     * 
     * @param name 名称
     * @param rev  版本  不赋值时 使用默认版本
     */
    SetRef(name:string,rev:string=""):void{
        XmlHelper.SetValue(this,"__name",name)
       if(rev.length>0){
        XmlHelper.SetValue(this,"__name",rev)
        XmlHelper.SetValue(this,"__useROR","false")
       }
       else
       XmlHelper.SetValue(this,"__useROR","true")
       
    }
    /**
     * 
     * @returns [name,rev,useror]
     */
    GetRef():[string,string,boolean]{
        let obj:[string,string,boolean]=["","",true]
        obj[0]=this.GetName()
        obj[1]=this.GetRevision()
        obj[2]=this.GetUseROR()
        return obj
    }
}