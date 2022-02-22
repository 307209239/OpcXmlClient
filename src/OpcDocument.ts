import { ExecuteResult } from "./model/ExecuteResult";
import { OpcSession } from "./OpcSession";
import { OpcXmlElement } from "./OpcXmlElement";
import { XmlHelper } from "./XmlHelper";

export class OpcDocument {
    CreateDomElement(tagName: string): Element {
        return this.RequestDocument.createElement(tagName);
    }

    RequestDocument: XMLDocument;
    ResponseDocument: XMLDocument | null;
    Session: OpcSession;
    RootElement: OpcXmlElement;
    constructor(session: OpcSession) {
        this.Session = session;
        this.RequestDocument = document.implementation.createDocument("", "", null)
        let el = this.RequestDocument.createElement("__InSite");
        el.setAttribute("__version", "1.1")
        el.setAttribute("__encryption", "2")
        this.RequestDocument.appendChild(el)
        this.RootElement = new OpcXmlElement(this, el)
        this.ResponseDocument = null;
    }
    Submit() {
        return this.Session.Submit(this.RequestDocument)
    }
    CheckError(): boolean {
        return true;

    }
    GetRootElement(): OpcXmlElement {
        return this.RootElement;
    }
    CheckErrors(): ExecuteResult {
        let re=new ExecuteResult()
        if (this.ResponseDocument != null) {
            let nodes = this.ResponseDocument.getElementsByTagName("__exceptionData")
            if (nodes.length > 0)
                for (let key in nodes) {
                    re.Message = XmlHelper.GetValue(nodes[0].getElementsByTagName("__errorDescription")[0])
                    re.Status = true
                    break
                }
            else
            {
                re.Message=""
                re.Status=false
            }
            

            return re
        }
        else {
            return new ExecuteResult(false, "没有返回值")
        }

    }
   



}