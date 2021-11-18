import { OpcXmlElement } from "./OpcXmlElement";

export class OpcRecordsetField extends OpcXmlElement {
    GetName(): string {
        return this.DomElement.nodeName

    }

}