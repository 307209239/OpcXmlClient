import { OpcParameters } from "./OpcParameters";
import { OpcXmlElement } from "./OpcXmlElement";

export class OpcPerform extends OpcXmlElement {
    AddParameters(): OpcParameters {
        let el = this.FindChildByName("__parameters")
        if (el == null)
            return new OpcParameters(this.Docment, null, "__parameters", this)
        else
            return new OpcParameters(this.Docment, el.DomElement)



    }
}