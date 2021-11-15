import { OpcDocument } from "./OpcDocument";
import { OpcNameObject } from "./OpcNameObject";
import { OpcXmlElement } from "./OpcXmlElement";
export class OpcSession {
    SessionId: string = ""
    private APIUrl: string
    CreateDocument(docName: string) {
        if (docName.length <= 0)
            throw new Error("CreateDocument 错误 name 不能为空");


    }
    Document: OpcDocument;
    RemoveDocument(docName: string) {

    }

    constructor(host: string, port: number, userName: string, password: string) {
        this.Document = new OpcDocument(this);
        let el = new OpcXmlElement(this.Document, null, "__session", this.Document.GetRootElement())
        this.APIUrl = "https://" + host + ":"+port+"/CamstarAppServer/api"
        //OpcSession.GetSessionId(host, port, userName, password)
        if (this.SessionId.length > 0) {
            let uel = el.Docment.CreateDomElement("__useSession")
            let user = new OpcNameObject(this.Document, null, "user", new OpcXmlElement(this.Document, uel)).SetRef(userName)

            let sel = el.Docment.CreateDomElement("sessionId")
            sel.setAttribute("__encrypted", "no");
            sel.appendChild(el.DomElement.ownerDocument.createCDATASection("aaaaaaaaaaaaaaaaaaaaaaa"));
            uel.appendChild(sel);
            el.DomElement.appendChild(uel);
        }


    }
    Submit(requestDocument: XMLDocument) {
        let doc=this.Document;
        let url=this.APIUrl
        let p=new Promise<OpcDocument>(function(resolve){
            let xhr = new XMLHttpRequest()
            xhr.open("POST",url)
            xhr.setRequestHeader("Access-Control-Allow-Origin","*")
            xhr.send(requestDocument);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    
                    doc.ResponseDocument=this.responseXML
                    resolve(doc)
                }
                else {
                   
                }
            }
        })
        return p
        
        
    }
    private static GetSessionId(host: string, port: number, userName: string, password: string): string {

        let xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tem=\"http://tempuri.org/\"><soapenv:Header/><soapenv:Body><tem:LoginFromXMLClient><tem:userName>" + userName + "</tem:userName><tem:password>" + password + "</tem:password><tem:sessionGuid></tem:sessionGuid></tem:LoginFromXMLClient></soapenv:Body></soapenv:Envelope>";
        //let doc=new DOMParser().parseFromString(xml, "text/xml");
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "https://" + host + ":"+port+"/camstarsecurityservices/authenticationservice.svc?wsdl")
        //xhr.open("POST", "https://" + host + ":"+port+"/CamstarAppServer/api", true)
        xhr.setRequestHeader("Content-Type", "text/xml;charset=utf-8")
        //xhr.setRequestHeader("Accept", "*/*")
        // xhr.setRequestHeader("Access-Control-Allow-Origin","*")
        // xhr.setRequestHeader("Allow-Access-Origin", "*")
        // xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
        //xhr.setRequestHeader("Access-Control-Allow-Methods", "POST")
        xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IAuthenticationService/LoginFromXMLClient")
         xhr.withCredentials = true
        //console.log(xhr.readyState); 
        xhr.send(xml);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
               
            }
            else {
              
            }
        }

        // axios.post("https://" + host + "/camstarsecurityservices/authenticationservice.svc", xml, { headers: { "SOAPAction": "http://tempuri.org/IAuthenticationService/LoginFromXMLClient", "Content-Type": "text/xml;charset=utf-8", "Access-Control-Allow-Origin": "*" } })
        //     .then(function (respone) {
        //         console.info(respone)

        //     })
        //     .catch(function (error) {
        //         console.error(error)
        //     })
        return ""

    }

}