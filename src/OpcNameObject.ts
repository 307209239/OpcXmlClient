import { OpcObject } from "./OpcObject";
import { XmlHelper } from "./XmlHelper";

export class OpcNameObject extends OpcObject {

    IsNamedObject=true
    SetRef(val: string): void {
        
        XmlHelper.SetValue(this, "__name", val, true)

    }
    GetRef(): string | null {
        let el=this.FindChildByName("__name");
        return el==null?null:el.GetValue()

    }

}