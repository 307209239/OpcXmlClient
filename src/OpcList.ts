import { ListActions } from "./ListActions";
import { OpcField } from "./OpcField";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcList extends OpcField {
    IsList() { return true }
    SetListAction(action: ListActions): void {

        switch (action) {
            case ListActions.Change:
                this.DomElement.setAttribute("__listAction", "change")

                break;
            case ListActions.Replace:
                this.DomElement.setAttribute("__listAction", "replace")
                break;

            default:
                throw new Error("ListActions 错误")
                break;
        }
    }
    GetListItems(): Array<OpcXmlElement> {

        let els = this.DomElement.getElementsByTagName("__listItem")
        let array: Array<OpcXmlElement> = new Array
        for (let key in els) {
            array.push(new OpcXmlElement(this.Docment, els[key]))
        }
        return array
    }
    DeleteItemByIndex(index: number): void {
        var el = new OpcXmlElement(this.Docment, null, "__listItemAction", this)
        el.DomElement.setAttribute("__listItemAction", "delete")
        XmlHelper.SetValue(el, "__index", index.toString())

    }
    GetItem(index: number): OpcXmlElement {
        let els = this.DomElement.getElementsByTagName("__listItem")
        for (let key in els) {
            if (parseInt(key) === index)
                return new OpcXmlElement(this.Docment, els[key])
        }
        throw new Error("index 索引超出范围")
    }

}