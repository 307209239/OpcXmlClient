import { OpcField } from "./OpcField";
export class OpcObject extends OpcField {
    NamedObjectField(name: string): OpcNameObject {

        return new OpcNameObject(this.Docment, null, name, this);

    }
    DataField(name: string): OpcDataField {
        return new OpcDataField(this.Docment, null, name, this);
    }

    Perform(ev: string): OpcPerform {
        let el = new OpcPerform(this.Docment, null, "__perform", this);
        new OpcDataField(this.Docment, null, "__eventName", el).SetValue(ev);
        return el;
    }
    SetObjectId(id: string): void {
        let el = this.FindChildByName("__Id") as OpcDataField
        if (el == null)
            el = new OpcDataField(this.Docment, null, "__Id", this);
        el.SetValue(id);

    }
    ObjectField(name: string): OpcObject { return new OpcObject(this.Docment, null, name, this); }

    ObjectList(name: string): OpcObjectList { return new OpcObjectList(this.Docment,null, name, this); }

    DataList(name: string):OpcDataList { return new OpcDataList(this.Docment,null, name, this); }

    ContainerList(name: string):OpcContainerList { return new OpcContainerList(this.Docment,null, name, this); }

    SubentityList(name: string):OpcSubentityList { return new OpcSubentityList(this.Docment,null, name, this); }

    NamedObjectList(name: string):OpcNamedObjectList { return new OpcNamedObjectList(this.Docment,null, name, this); }

    RevisionedObjectList(name: string):OpcRevisionedObjectList { return new OpcRevisionedObjectList(this.Docment,null, name, this); }

    NamedSubentityList(name: string):OpcNamedSubentityList { return new OpcNamedSubentityList(this.Docment,null, name, this); }

    SubentityField(name: string):OpcSubentity { return new OpcSubentity(this.Docment,null, name, this); }

    ContainerField(name: string):OpcContainer { return new OpcContainer(this.Docment,null, name, this); }

    NamedSubentityField(name: string):OpcNamedSubentity { return new OpcNamedSubentity(this.Docment,null, name, this); }

    RevisionedObjectField(name: string):OpcRevisionedObject { return new OpcRevisionedObject(this.Docment,null, name, this); }
}
import { OpcNameObject } from "./OpcNameObject";
import { OpcPerform } from "./OpcPerform";
import { OpcDataField } from "./OpcDataField";import { OpcObjectList } from "./OpcObjectList ";
import { OpcDataList } from "./OpcDataList";
import { OpcContainerList } from "./OpcContainerList";
import { OpcSubentityList } from "./OpcSubentityList";
import { OpcNamedObjectList } from "./OpcNamedObjectList";
import { OpcRevisionedObjectList } from "./OpcRevisionedObjectList";
import { OpcNamedSubentityList } from "./OpcNamedSubentityList";
import { OpcSubentity } from "./OpcSubentity";
import { OpcContainer } from "./OpcContainer";
import { OpcNamedSubentity } from "./OpcNamedSubentity";
import { OpcRevisionedObject } from "./OpcRevisionedObject";

