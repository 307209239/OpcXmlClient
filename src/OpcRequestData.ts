import { OpcField } from "./OpcField";
import { OpcRequestField } from "./OpcRequestField";

export class OpcRequestData extends OpcField{

    RequestField(name:string):OpcRequestField{
        return new OpcRequestField(this.Docment,null,name,this)

    }

}