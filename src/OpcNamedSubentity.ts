import { OpcDataField } from "./OpcDataField";
import { OpcObject } from "./OpcObject";
import { OpcParentInfo } from "./OpcParentInfo";

export class OpcNamedSubentity extends OpcObject {
    IsNamedSubentity = true
    GetName(): string {
        var p = this.FindChildByName("__name")

        return p == null ? "" : p?.GetValue()
    }
    SetName(name: string): void {
        let el = new OpcDataField(this.Docment, null, "__name", this)
        el.SetValue(name)
    }
    GetParentInfo(): OpcParentInfo | null {
        var p = this.FindChildByName("__parent")
        if (p != null)
            return new OpcParentInfo(this.Docment, p?.DomElement)
        else
            return null

    }
    SetParentId(id: string): void {
        let p = this.ParentInfo()
        let f = new OpcDataField(this.Docment, null, "__id", p)
        f.SetValue(id)


    }
    ParentInfo(): OpcParentInfo {
        return new OpcParentInfo(this.Docment, null, "__parent", this)
    }
}