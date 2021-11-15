import { OpcObject } from "./OpcObject";
import { XmlHelper } from "./XmlHelper";

export class OpcNameObject extends OpcObject {

    IsNamedObject(): boolean { return true }
    SetRef(val: string): void {
        
        XmlHelper.SetValue(this, "__name", val, true)

    }
    GetRef(): string | null {
        return this.DomElement.nodeValue;

    }

}