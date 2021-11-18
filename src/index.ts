"use strict";
import { OpcHelper } from "./OpcHelper";
console.info('start')
var com = new OpcHelper("192.168.18.129", 443, "camstaradmin", "abc123..","FactoryMaint");
 var objectChanges = com.ChangesNDO("AA");
 objectChanges.ContainerField("BB").SetRef("aa","lot")
 let containers=objectChanges.NamedObjectList("Containers")
 containers.AppendItem("LOT01")
 containers.DeleteItem("LOT02")
 containers.ChangeItem("old","new");
 //containers.DeleteItem("LOT02")
 let req=com.RequestData()
 req?.RequestField("Container.Qty.Qty.Qty")
var re = com.ExecuteResult().then(function ([status,message]) {
    console.info( new XMLSerializer().serializeToString(com.Session.Document.RequestDocument))
    if(status)
    console.info(message)
    else
    console.warn(message)
    if(com.Session.Document.ResponseDocument!=null)
    console.info( new XMLSerializer().serializeToString(com.Session.Document.ResponseDocument))
});




console.info('end')
