import { OpcObject } from "./OpcObject";
import { OpcParentInfo } from "./OpcParentInfo";
import { XmlHelper } from "./XmlHelper";

export class OpcSubentity extends OpcObject {
    IsSubentity = true;
    GetParentInfo(): OpcParentInfo | null {
        let el = this.FindChildByName("__parent")
        return el == null ? null : new OpcParentInfo(this.Docment, el.DomElement)
    }
    SetParentId(id: string): void {
        XmlHelper.SetValue2(this, "__parent", "__Id", id)
    }
    ParentInfo(): OpcParentInfo {
        let p = this.GetParentInfo()
        return p == null ? new OpcParentInfo(this.Docment, null, "__parent", this) : p
    }
}