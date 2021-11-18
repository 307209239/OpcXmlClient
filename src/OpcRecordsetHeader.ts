import { OpcRecordsetHeaderColumn } from "./OpcRecordsetHeaderColumn";
import { OpcXmlElement } from "./OpcXmlElement";

export class OpcRecordsetHeader extends OpcXmlElement {
    private RootElement: string = "__recordSetHeader"
    GetCount(): number {
        let attr = this.DomElement.getAttribute("__columnCount")
        return attr == null ? 0 : parseInt(attr)
    }
    GetColumns(): Array<OpcRecordsetHeaderColumn> {
        let els = this.DomElement.getElementsByTagName("__column")
        let columns: Array<OpcRecordsetHeaderColumn> = new Array
        for (let key in els) {
            columns.push(new OpcRecordsetHeaderColumn(this.Docment, els[key]))
        }
        return columns
    }
}