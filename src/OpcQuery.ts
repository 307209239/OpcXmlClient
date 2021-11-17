import { OpcRecordset } from "./OpcRecordset";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcQuery extends OpcXmlElement {
    GetRecordset(): OpcRecordset | null {
        let el = this.FindChildByName("__responseData")?.FindChildByName("__recordSet")
        if (el != null)
            return new OpcRecordset(this.Docment, el.DomElement)
        else
            return null

    }
    GetRowsetSize(): number {
        let el = this.FindChildByName("__rowSetSize")
        return parseInt(el == null ? "0" : el.GetValue())
    }
    SetRowsetSize(size: number): void {
        XmlHelper.SetValue(this, "__rowSetSize", size.toString())

    }
    GetSqlText(): string {
        let el = this.FindChildByName("__queryText")
        return el == null ? "" : el.GetValue()
    }
    SetSqlText(sql: string): void {
        XmlHelper.SetValue(this, "__queryText", sql)
    }
}