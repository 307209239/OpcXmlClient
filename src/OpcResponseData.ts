import { OpcDocument } from "./OpcDocument";
import { OpcField } from "./OpcField";
import { OpcSubentity } from "./OpcSubentity";
import { OpcXmlElement } from "./OpcXmlElement";

export class OpcResponseData extends OpcXmlElement{
    constructor(doc: OpcDocument, ele: Element | null, tag: string = "", parent: OpcXmlElement | null = null,) {
        super(doc, ele, "__responseData", parent)

    }
    GetResponseFields():Array<OpcXmlElement>{
        return this.GetAllChildren()
    }
    GetSessionValues():OpcSubentity|null{
        let el=this.FindChildByName("__sessionValues")
        return el==null?null:new OpcSubentity(this.Docment,el.DomElement)

    }
    GetResponseFieldByName(name:string):OpcField|null{
        let el=this.FindChildByName(name)
        return el==null?null:new OpcField(this.Docment,el.DomElement)
    }
}