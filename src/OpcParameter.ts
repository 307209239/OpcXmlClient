import { OpcDataField } from "./OpcDataField";
import { OpcDocument } from "./OpcDocument";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcParameter extends OpcXmlElement {
    private nameElement: OpcDataField;
    private valueElement: OpcDataField;

    constructor(doc: OpcDocument, ele: Element | null, tag: string = "", parent: OpcXmlElement | null = null, name: string="") {
        super(doc, ele, tag, parent)
        this.nameElement = new OpcDataField(doc, null, "__name", this);
        this.nameElement.SetValue(name)
        this.valueElement = new OpcDataField(doc, null, "__value", this);
    }
    GetValue(): string {
        return XmlHelper.GetValue(this.valueElement.DomElement)

    }
    SetValue(val: string): void {
        this.valueElement.SetValue(val)
    }

}