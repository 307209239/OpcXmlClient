"use strict";
import { OpcHelper } from "./OpcHelper";
console.info('start')
var com = new OpcHelper("192.168.18.129", 443, "camstaradmin", "abc123..","FactoryMaint");
 var objectChanges = com.ChangesNDO("F1");
 objectChanges.DataField("Description").SetValue("123");
 objectChanges.NamedObjectField("AAA").SetRef("CC")
 objectChanges.ContainerField("BB").SetRef("aa","lot")
var re = com.ExecuteResult().then(function (data) {
    if(data[0])
    console.info(data[1])
    else
    console.warn(data[1])
});
//console.info(re.Message);
var s=new XMLSerializer().serializeToString(com.Session.Document.RequestDocument)
console.info( s)
// if(com.Session.Document.ResponseDocument!=null)
// console.info( new XMLSerializer().serializeToString(com.Session.Document.ResponseDocument))
console.info('end')
