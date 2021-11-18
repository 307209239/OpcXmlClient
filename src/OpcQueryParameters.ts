import { OpcDocument } from "./OpcDocument";
import { OpcParameters } from "./OpcParameters";
import { OpcXmlElement } from "./OpcXmlElement";

export class OpcQueryParameters extends OpcParameters {
    private RootElement = "__queryParameters"
    constructor(doc: OpcDocument, ele: Element | null, tag: string = "", parent: OpcXmlElement | null = null, queryName: string = "") {
        super(doc, ele, "__queryParameters", parent)
        if (queryName.length > 0)
            this.DomElement.setAttribute("__queryName", queryName);
    }
}