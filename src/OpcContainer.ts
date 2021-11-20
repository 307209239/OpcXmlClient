import { OpcDataField } from "./OpcDataField";
import { OpcObject } from "./OpcObject";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcContainer extends OpcObject {
    IsContainer = true

    GetName(): string {
        let el = this.FindChildByName("__name");
        if (el != null) {
            return el.GetValue();
        }
        else {
            return ""
        }
    }
    SetRef(name: string, level: string = ""): void {
        XmlHelper.SetValue(this, "__name", name)
        if (level?.length > 0) {
            let el = this.FindChildByName("__level");
            if (el == null) {
                el = new OpcXmlElement(this.Docment, null, "__level", this)
            }
            XmlHelper.SetValue(el, "__name", name)
        }
    }
    GetLevel(): string {
        let el = this.FindChildByName("__level")?.FindChildByName("__name")
        return el == null || el == undefined ? "" : el.GetValue()


    }
}