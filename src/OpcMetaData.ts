import { OpcDocument } from "./OpcDocument";
import { OpcXmlElement } from "./OpcXmlElement";

export class OpcMetaData extends OpcXmlElement{
    constructor(doc: OpcDocument, ele: Element | null, tag: string = "", parent: OpcXmlElement | null = null,) {
        super(doc, ele, "__metadata", parent)

    }
    // GetCdoType(){
    //     this.FindChildByName("__CDOSubTypes")?.FindChildByName("__CDOType")?.FindChildByName("__field.__CDOType")

    // }
    
}