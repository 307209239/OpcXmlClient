import { OpcXmlElement } from "./OpcXmlElement";

export class XmlHelper {
    static SetValue(el: OpcXmlElement, name: string, val: string, isCDATA: boolean=true):void {
        let ele = el.FindChildByName(name)?.DomElement;
        if (ele != null)
            el.DomElement.removeChild(ele)
        let newEl=new OpcXmlElement(el.Docment,null, name,el);
        if(isCDATA)
            newEl.DomElement.appendChild(el.DomElement.ownerDocument.createCDATASection(val))
       
    }
    static GetValue(el:Element|null):string{
        if(el==null) return""
         let str=el.innerHTML;
        if(str.indexOf("<![CDATA[")>=0)
         return str.substring(9,str.length-3)
         else 
          return el.innerHTML


    }


}