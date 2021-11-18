import { OpcDataField } from "./OpcDataField";
import { OpcParameter } from "./OpcParameter";
import { OpcParameters } from "./OpcParameters";
import { OpcQueryParameters } from "./OpcQueryParameters";
import { OpcRecordset } from "./OpcRecordset";
import { OpcRecordsetHeader } from "./OpcRecordsetHeader";
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
    GetStartRow(): number {
        let el = this.FindChildByName("__startRow")
        return el == null ? 0 : parseInt(el.GetValue())
    }
    SetStartRow(index: number): void {
        XmlHelper.SetValue(this, "__startRow", index.toString())
    }
    GetQueryName(): string {
        let el = this.FindChildByName("__queryName")
        return el == null ? "" : el.GetValue()
    }
    SetQueryName(name: string): void {
        XmlHelper.SetValue(this, "__queryName", name)
    }
    GetQueryParameters(): OpcQueryParameters | null {
        let el = this.FindChildByName("__queryParameters")
        if (el == null) return null
        return new OpcQueryParameters(this.Docment, el?.DomElement);
    }
    GetRecordsetHeader(): OpcRecordsetHeader | null {
        let el = this.FindChildByName("__responseData")?.FindChildByName("__recordSetHeader")
        if (el == null || el == undefined) return null
        return new OpcRecordsetHeader(this.Docment, el.DomElement);

    }
    GetRequestRecordCount(): boolean {
        let el = this.FindChildByName("__requestRecordCount")
        if (el == null) return false
        return el.GetValue() == "true";
    }
    GetRecordCount(): number {
        let el = this.FindChildByName("__responseData")?.FindChildByName("__recordCount")?.GetValue()
        return el == null || el == undefined ? 0 : parseInt(el)
    }
    SetCdoTypeId(id: number) {
        XmlHelper.SetValue(this, "__CDOTypeId", id.toString())
    }
    GetUserQueryChangeCount(): number {
        let el = this.FindChildByName("__responseData")?.FindChildByName("__changeCount")?.GetValue()
        return el == null || el == undefined ? 0 : parseInt(el)
    }
    ClearParameters(): void {
        let el = this.FindChildByName("__queryParameters")
        if (el != null)
            el.RemoveAllChildren()
    }
    SetParameter(name: string, val: string): void {
        this.GetQueryParameters()?.SetParameter(name, val)
    }
    GetParameter(name: string): OpcParameter | null {
        let ps = this.GetQueryParameters()
        if (ps != null) {
            return ps.GetParameterByName(name);
        }
        return null
    }
    SetUserQueryName(name: string, changeCount: number): void {
       let el= XmlHelper.SetValue(this,"__queryName",name)
       el.setAttribute("__type","user")
       el.setAttribute("__changeCount",changeCount.toString())
    }
}