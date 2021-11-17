import { OpcParameter } from "./OpcParameter";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcParameters extends OpcXmlElement {

    GetCount(): number {
        return this.DomElement.childNodes.length
    }
    GetParameterByName(name: string): OpcParameter | null {
        let els = this.DomElement.getElementsByTagName("__parameter")
        for (let key in els) {
            let childs = (els[key]).getElementsByTagName("__name")
            if (childs.length >= 0 && XmlHelper.GetValue(childs[0]) == name)
                return new OpcParameter(this.Docment, els[key])

        }
        return null

    }
    ClearAll(): void {
        this.DomElement.innerHTML = ""
    }
    SetParameter(name: string, val: string): void {
        let el = this.GetParameterByName(name)
        if (el == null) {
            el = new OpcParameter(this.Docment, null, "__parameter", this,name)
        }
        el.SetValue(val)
    }
    RemoveParameterByName(name: string): void {
        let el = this.GetParameterByName(name)
        if (el != null)
            this.DomElement.removeChild(el.DomElement)

    }
}