import { OpcField } from "./OpcField";
import { OpcXmlElement } from "./OpcXmlElement";
import { SerializationMode } from "./SerializationModes";
import { XmlHelper } from "./XmlHelper";

export class OpcRequestField extends OpcField {

    SetSerializationMode(mode: SerializationMode) {
        switch (mode) {
            case SerializationMode.Deep:
                this.DomElement.setAttribute("__serialization", "deep")
                break;
            case SerializationMode.Shallow:
                this.DomElement.setAttribute("__serialization", "shallow")
                break;

            default:
                this.DomElement.setAttribute("__serialization", "shallow")
                break;
        }

    }
    RequestSelectionValues(): void {

    }
    RequestAllFields(): void {
        let f = this.FindChildByName("__allFields")
        if (f == null)
            new OpcXmlElement(this.Docment, null, "__allFields", this)

    }
    RequestField(name:string):OpcRequestField{
       let el=this.FindChildByName(name)
       return el==null?new OpcRequestField(this.Docment,null,name,this):new OpcRequestField(this.Docment,el.DomElement)

    }
    RequestAllFieldsRecursive():void{
         this.RequestAllFields();
         this.FindChildByName("__allFields")?.DomElement.setAttribute("__recursive","true")
    }
    RequestCaption():void{
        let el=this.FindChildByName("__metadata")
        if(el==null)
        new OpcXmlElement(this.Docment,null,"__metadata",this)
    }
    RequestUserDefinedFields():void{
        let el=this.FindChildByName("__userDefinedFields")
        if(el==null)
        new OpcXmlElement(this.Docment,null,"__userDefinedFields",this)
    }
    RequestFieldDefinition():void{
        let el=this.FindChildByName("__metadata")
        if(el==null)
        el= new OpcXmlElement(this.Docment,null,"__metadata",this)
        XmlHelper.SetValue(el,"__fieldDef","")
    }
    RequestCdoDefinition():void{
        
    }

}