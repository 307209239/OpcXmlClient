import { OpcDocument } from "./OpcDocument";
import { OpcRecordsetField } from "./OpcRecordsetField";
import { OpcXmlElement } from "./OpcXmlElement";

export class OpcRecordset extends OpcXmlElement {
    constructor(doc: OpcDocument, ele: Element | null, tag: string = "", parent: OpcXmlElement | null = null,) {
        super(doc, ele, "__recordSet", parent)

    }
    GetRecordCount(): number {
        return this.DomElement.childNodes.length
    }
    GetFields():Array<OpcRecordsetField>|null{
        return null

    }
}