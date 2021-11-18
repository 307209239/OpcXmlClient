import { OpcDocument } from "./OpcDocument";
import { OpcField } from "./OpcField";
import { OpcRequestField } from "./OpcRequestField";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcRequestData extends OpcField {

    constructor(doc: OpcDocument, ele: Element | null, tag: string = "", parent: OpcXmlElement | null = null, queryName: string = "") {
        super(doc, ele, "__requestData", parent)
    }
    RequestField(name: string): OpcRequestField | null {
        let strs = name.split('.')
        let el: OpcXmlElement = this;
        let first: OpcRequestField | null = null
        for (let s in strs) {
            let e = this.FindChildByName(strs[s])
            if (e == null)
                e = new OpcXmlElement(this.Docment, null, strs[s], el)
            el = e;
            if (parseInt(s) == 0)
                first = new OpcRequestField(this.Docment, el.DomElement)

        }
        return first
    }
    IsRequestData = true
    RequestAllFields(): void {
        new OpcXmlElement(this.Docment, null, "__allFields", this)
    }
    RequestSessionValues(): void {
        new OpcXmlElement(this.Docment, null, "__sessionValues", this)
    }
    RequestAllFieldsRecursive(): void {
        let el = new OpcXmlElement(this.Docment, null, "__allFields", this)
        el.DomElement.setAttribute("__recursive", "true")
    }
    RequestFields(names: Array<string>): void {
        for (let key in names) {
            this.RequestField(names[key])
        }
    }

}