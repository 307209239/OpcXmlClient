import { OpcDataField } from "./OpcDataField";
import { OpcNameObject } from "./OpcNameObject";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcParentInfo extends OpcXmlElement {

    SetObjectId(id: string): void {
        XmlHelper.SetValue(this, "__Id", id);
    }
    SetObjectType(typeName: string): void {
        this.DomElement.setAttribute("__CDOTypeName", typeName);
    }
    GetParentId(): string {
        let el = this.FindChildByName("__Id")
        return el != null ? el.GetValue() : ""

    }
    SetParentId(id: string): void {
        let el = new OpcXmlElement(this.Docment, null, "__parent", this)
        let d = new OpcDataField(this.Docment, null, "__Id", el)
        d.SetValue(id)
    }
    GetNamedObjectRef(): string {
        let el = this.FindChildByName("__name")
        return el != null ? el.GetValue() : ""
    }
    SetNamedObjectRef(name: string) {
        let el = new OpcNameObject(this.Docment, null, "__name", this)
        el.SetRef(name)
    }
    GetName(): string {
        return this.GetNamedObjectRef()
    }
    SetName(name: string): void {
        this.SetNamedObjectRef(name)

    }
    GetParentInfo(): OpcParentInfo | null {
        let el = this.FindChildByName("__parent")
        return el != null ? new OpcParentInfo(this.Docment, el.DomElement) : null
    }
    ParentInfo(): OpcParentInfo {
        let el = this.GetParentInfo()
        if (el == null)
            el = new OpcParentInfo(this.Docment, null, "__parent", this)
        return el
    }
    SetContainerRef(name: string, level: string = ""): void {
        XmlHelper.SetValue(this, "__name", name)
        if (level.length > 0) {
            let el = new OpcNameObject(this.Docment, null, "__level", this)
            el.SetRef(level)
        }
    }
    SetRevisionedObjectRef(name: string, rev: string = "", useROR: boolean = true) {
        XmlHelper.SetValue(this, "__name", name)
        useROR = rev.length <= 0
        if (useROR) {
            XmlHelper.SetValue(this, "useROR", "1")
        }
        else {
            XmlHelper.SetValue(this, "__rev", rev)
            XmlHelper.SetValue(this, "useROR", "0")
        }

    }
    /**
     * 获取container 
     * @returns [name,level]
     */
    GetContainerRef(): [string, string] {
        let con: [string, string] = ["", ""]
        con[0] = this.GetName()
        let el = this.FindChildByName("__level")
        if (el != null){
            let l = el.FindChildByName("__name")
            if (l != null)
                con[1] =l.GetValue()
        }
        return con
    }
    /**
     * 获取 revsionObject
     * @returns [name,rev,useROR]
     */
    GetRevisionedObjectRef():[string,string,boolean]{
        let re:[string,string,boolean]=["","",true]
        re[0]=this.GetName()
        let rev=this.FindChildByName("__rev")
        re[1]=rev!=null?rev.GetValue():""
        let ror=this.FindChildByName("__useROR")
        re[2]=ror!=null?this.GetValue()=="true":false
        return re

    }
}