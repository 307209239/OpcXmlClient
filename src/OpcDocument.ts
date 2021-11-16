import { OpcSession } from "./OpcSession";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcDocument {
    CreateDomElement(tagName: string):Element {
       return this.RequestDocument.createElement(tagName);
    }

    RequestDocument: XMLDocument;
    ResponseDocument: XMLDocument|null;
    Session: OpcSession;
    RootElement: OpcXmlElement;
    constructor(session: OpcSession) {
        this.Session = session;
        this.RequestDocument=document.implementation.createDocument("","",null)
        let el= this.RequestDocument.createElement("__InSite");
        el.setAttribute("__version","1.1")
        el.setAttribute("__encryption","2")
        this.RequestDocument.appendChild(el)
        this.RootElement = new OpcXmlElement(this,el)
        this.ResponseDocument = null;
    }
    Submit() {
        return  this.Session.Submit(this.RequestDocument)
    }
    CheckError(): boolean {
        return true;

    }
    GetRootElement(): OpcXmlElement {
        return this.RootElement;
    }
    CheckErrors():[boolean,string|null]{
        let re:[boolean,string|null]=[false,""] 
       if(this.ResponseDocument!=null){
         let nodes=this.ResponseDocument.getElementsByTagName("__exceptionData")
        for (let key in nodes){
            re[1]=XmlHelper.GetValue(nodes[0].getElementsByTagName("__errorDescription")[0])
            re[0]=true
            break
        }
        
        return re
       }
       else{
           return [false,"没有返回值"]
       }

    }



}