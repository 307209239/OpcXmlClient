import { OpcObject } from "./OpcObject";

export class OpcDataField extends OpcObject{

    IsDataField(){return true}
    SetValue(val:string){
        let v=this.DomElement.ownerDocument.createCDATASection(val)
        this.DomElement.appendChild(v)
    }
}