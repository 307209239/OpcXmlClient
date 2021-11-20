import { OpcDocument } from "./OpcDocument";
import { XmlHelper } from "./XmlHelper";

export class OpcXmlElement {
    /**
     * 查找和name匹配的第一个节点
     * @param name 
     * @returns 
     */
    FindChildByName(name: string): OpcXmlElement | null {
        let els = this.DomElement.childNodes
        if (els.length > 0)
            for (let key in els) {
                if (els[key].nodeName == name)
                    return new OpcXmlElement(this.Docment, els[key] as Element)
            }
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
    /**
     * 删除所有子节点
     */
    RemoveAllChildren(): void {
        this.DomElement.innerHTML = ""
    }
    public IsField: boolean = false;

    public IsObject: boolean = false

    public IsContainer: boolean = false

    public IsList: boolean = false

    public IsNamedObject: boolean = false

    public IsService: boolean = false

    public IsRevisionedObject: boolean = false

    public IsRequestData: boolean = false

    public IsDataField: boolean = false

    public IsSubentity: boolean = false

    public IsDataList: boolean = false

    public IsContainerList: boolean = false

    public IsNamedObjectList: boolean = false

    public IsRevisionedObjectList: boolean = false

    public IsSubentityList: boolean = false

    public IsNamedSubentityList: boolean = false

    public IsNamedSubentity: boolean = false

    public IsObjectList: boolean = false
    GetValue(): string {
        return XmlHelper.GetValue(this.DomElement)
    }
    GetAllChildren(): Array<OpcXmlElement> {
        let childs = this.DomElement.childNodes
        let list: Array<OpcXmlElement> = new Array
        for (let key in childs) {
            list.push(new OpcXmlElement(this.Docment, childs[key] as Element))
        }
        return list
    }
    /**
     * 设置属性
     * @param name 名称
     * @param val 值
     */
    SetAttribute(name:string,val:string):void{
        this.DomElement.setAttribute(name,val)
    }
}