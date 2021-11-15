import { OpcDocument } from "./OpcDocument";
import { XmlHelper } from "./XmlHelper";

export class OpcXmlElement {
    FindChildByName(name: string): OpcXmlElement | null {
        let els = this.DomElement.getElementsByTagName(name)
        if (els.length > 0)
            return new OpcXmlElement(this.Docment, els.item(0))
        else
            return null
    }
    Docment: OpcDocument;
    DomElement: Element;
    /**
     * 
     * @param doc 文档
     * @param ele 元素
     * @param tag  标签
     * @param parent 标签父元素
     */
    constructor(doc: OpcDocument, ele: Element | null, tag: string = "", parent: OpcXmlElement | null = null) {
        this.Docment = doc
        if (ele != null) {
            this.DomElement = ele
        }
        else {
            if (tag.length <= 0)
                throw new Error("CreateTag 错误：name不能为空");
            this.DomElement = this.Docment.CreateDomElement(tag);
            let el = new OpcXmlElement(this.Docment, this.DomElement)
            parent?.AppendChild(el)
        }


    }
    AppendChild(ele: OpcXmlElement) {

        this.DomElement.appendChild(ele.DomElement)

    }
    public IsField(): boolean { return false };

    public IsObject(): boolean { return false };

    public IsContainer(): boolean { return false };

    public IsList(): boolean { return false };

    public IsNamedObject(): boolean { return false };

    public IsService(): boolean { return false };

    public IsRevisionedObject(): boolean { return false };

    public IsRequestData(): boolean { return false };

    public IsDataField(): boolean { return false };

    public IsSubentity(): boolean { return false };

    public IsDataList(): boolean { return false };

    public IsContainerList(): boolean { return false };

    public IsNamedObjectList(): boolean { return false };

    public IsRevisionedObjectList(): boolean { return false };

    public IsSubentityList(): boolean { return false };

    public IsNamedSubentityList(): boolean { return false };

    public IsNamedSubentity(): boolean { return false };

    public IsObjectList(): boolean { return false };
    GetValue(): string {
        return XmlHelper.GetValue(this.DomElement)
    }
}