import { OpcFieldType } from "./OpcFieldType";
import { OpcLabel } from "./OpcLabel";
import { OpcXmlElement } from "./OpcXmlElement";

export class OpcRecordsetHeaderColumn extends OpcXmlElement {
    private RootElement: string = "__column"
    GetName(): string {
        let el = this.FindChildByName("__name")
        return el == null ? "" : el?.GetValue()

    }
    GetLabel(): OpcLabel | null {
        let el = this.FindChildByName("__label")
        if (el == null) return null
        return new OpcLabel(this.Docment, el.DomElement)
    }
    GetFieldType(): OpcFieldType | null {
        let el = this.FindChildByName("__fieldType")
        if (el == null) return null
        return new OpcFieldType(this.Docment, el.DomElement)
    }

}