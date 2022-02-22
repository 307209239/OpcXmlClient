import { ExecuteResult } from "./model/ExecuteResult";
import { OpcDocument } from "./OpcDocument";
import { OpcNameObject } from "./OpcNameObject";
import { OpcObject } from "./OpcObject";
import { OpcPerform } from "./OpcPerform";
import { OpcRequestData } from "./OpcRequestData";
import { OpcService } from "./OpcService";
import { OpcSession } from "./OpcSession";
import { PerformType } from "./PerformType";
import { XmlHelper } from "./XmlHelper";

export class OpcHelper {

    Session: OpcSession;
    Service: OpcService | null;
    /**更新NDO */
    ChangesNDO(name: string): OpcNameObject {
        this.InputData().NamedObjectField("ObjectToChange").SetRef(name);
        this.Perform(PerformType.Load);
        return this.InputData().NamedObjectField("ObjectChanges");
    }
    NewNDO(name: string): OpcNameObject {
        this.Perform(PerformType.New);
        let el= this.InputData()?.NamedObjectField("ObjectChanges");
        el.SetRef(name)
        return el

    }
    Perform(performType: PerformType): OpcPerform | null {
        if (this.Service == null) return null
        let ev
        switch (performType) {
            case PerformType.Load:
                ev = ("Load");
                break
            case PerformType.New:
                ev = ("New");
                break
            case PerformType.Change:
                ev = ("Load");
                break
            case PerformType.Delete:
                ev = ("delete");
                break
            case PerformType.NewRev:
                ev = ("NewRev");
                break

        }

        return this.Service.Perform(ev);
    }

    constructor(host: string, port: number, user: string, password: string, serviceName: string, isService: boolean = true) {
        this.Session = new OpcSession(host, port, user, password);
        if (isService) {
            this.Service = new OpcService(this.Session.Document, null, "__service", this.Session.Document.GetRootElement());
            this.Service?.DomElement.setAttribute("__serviceType", serviceName)
        }
        else {
            this.Service = null
        }

        let docName = serviceName + "_doc"
        this.Session.RemoveDocument(docName);


    }
    InputData(): OpcObject {
        if (this.Service != null)
            return this.Service.InputData();
        else
            throw new Error("Service 没有实例化")
    }
    RequestData(): OpcRequestData | undefined {
        return this.Service?.RequestData()
    }
    Submit() {
        return Promise.race([this.Session.Document.Submit()]);
    }
    ExecuteResult(){
        let doc = this
        return Promise.race([new Promise<ExecuteResult>(function (resolve) {
           
            doc.Service?.SetExecute();
            doc.RequestData()?.RequestField("CompletionMsg");
            doc.Submit().then(function (data) {
                let x = data?.CheckErrors();
                x.Status = !x.Status
                if(x.Status&&data.ResponseDocument!=null){
                   let el= data.ResponseDocument.getElementsByName("CompletionMsg")
                    XmlHelper.GetValue(el[0])
                   
                }
                x.Data=OpcHelper.Xml2json(data.ResponseDocument)
                resolve(x)
            });

        })]);

    }
    
   static Xml2json(xml:any ):Object {
        try {
          let obj :any=new Object();
          if (xml.children.length > 0) {
            for (let i = 0; i < xml.children.length; i++) {
              let item = xml.children.item(i);
              if(item==null) continue;
              let nodeName = item?.nodeName;
              if(item==null) continue;
              if (nodeName!=null&& typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = this.Xml2json(item);
              } else {
                if (nodeName!=null&&typeof(obj[nodeName].push) == "undefined") {
                  var old = obj[nodeName];
                  obj[nodeName] = [];
                  obj[nodeName].push(old);
                }
                obj[nodeName].push(this.Xml2json(item));
              }
            }
          } else {
            obj = xml.textContent;
          }
          return obj;
        } catch (e) {
         throw e
        }
      }
}