import { OpcXmlElement } from "./OpcXmlElement";

export class OpcField extends OpcXmlElement {
    IsField(): boolean { return true; }
}