import { OpcObject } from "./OpcObject";
import { OpcRequestData } from "./OpcRequestData";
import { OpcXmlElement } from "./OpcXmlElement";

export class OpcService extends OpcObject {
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

}