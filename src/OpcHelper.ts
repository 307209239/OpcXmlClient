import { OpcDocument } from "./OpcDocument";
import { OpcNameObject } from "./OpcNameObject";
import { OpcObject } from "./OpcObject";
import { OpcPerform } from "./OpcPerform";
import { OpcRequestData } from "./OpcRequestData";
import { OpcService } from "./OpcService";
import { OpcSession } from "./OpcSession";
import { PerformType } from "./PerformType";

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
        return this.InputData()?.NamedObjectField("ObjectChanges");
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
    ExecuteResult() {
        let doc = this
        return Promise.race([new Promise<[boolean, string | null]>(function (resolve) {
            let x: [boolean, string | null] = [false, ""];
            doc.Service?.SetExecute();
            doc.RequestData()?.RequestField("CompletionMsg");
            doc.Submit().then(function (data) {
                x = data?.CheckErrors();
                x[0] = !x[0]
                resolve(x)
            });

        })]);

    }
}