import { OpcDataField } from "./OpcDataField";
import { OpcDocument } from "./OpcDocument";
import { OpcField } from "./OpcField";
import { OpcObject } from "./OpcObject";
import { OpcRequestData } from "./OpcRequestData";
import { OpcResponseData } from "./OpcResponseData";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcService extends OpcObject {
    constructor(doc: OpcDocument, ele: Element | null, tag: string = "", parent: OpcXmlElement | null = null){
        super(doc,ele,"__service",parent)
       // new OpcDataField(doc,null,"__txnGUID",this).SetValue()
        new OpcDataField(doc,null,"__utcOffset",this).SetValue("+08:00")

    }
    IsService=true
    InputData(): OpcObject {
        return new OpcObject(this.Docment, null, "__inputData", this)
    }
    SetExecute(): void {
        if (this.FindChildByName("__execute") != null) return
        new OpcXmlElement(this.Docment, null, "__execute", this);
    }
    RequestData(): OpcRequestData {
        let el = this.FindChildByName("__requestData")
        if (el != null)
            return  new OpcRequestData(this.Docment, el.DomElement)
        else
            return new OpcRequestData(this.Docment, null, "__requestData", this);
    }
    ResponseData():OpcResponseData|null{
        let el = this.FindChildByName("__responseData")
        return el==null?null:new OpcResponseData(this.Docment,el.DomElement)
    }

}