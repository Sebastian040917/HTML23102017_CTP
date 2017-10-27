var tree;
var resourceStore;
var eventStore;

function generateMepXML(data) {
    var xmlData;

    xmlData = '<?xml version="1.0" encoding="utf-8"?>';
    xmlData += '<entry xml:base="' + params.baseUrl + 'sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/" xmlns="http://www.w3.org/2005/Atom" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices">';
    xmlData += '<id>' + params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + data.sessionId + "')</id>";
    xmlData += '<title type="text">' + "ServerSideObjects('" + data.sessionId + "')</title>";
    xmlData += '<updated>2015-05-26T00:03:41Z</updated>';
    xmlData += '<category term="ZCXGS_CSDSLSBM_LS_ORDER_PLAN.ServerSideObject" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme"/>';
    xmlData += '<link href="' + "ServerSideObjects('" + data.sessionId + "')" + '" rel="edit" title="ServerSideObject"/>';
    xmlData += '<link href="' + "ServerSideObjects('" + data.sessionId + "')" + '/MEP_List" rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/MEP_List" type="application/atom+xml;type=feed" title="MEP_List"/>';
    xmlData += '<link href="' + "ServerSideObjects('" + data.sessionId + "')" + '/Chart_Elements" rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Chart_Elements" type="application/atom+xml;type=feed" title="Chart_Elements"/>';
    xmlData += '<link href="' + "ServerSideObjects('" + data.sessionId + "')" + '/Pump_List" rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Pump_List" type="application/atom+xml;type=feed" title="Pump_List"/>';
    xmlData += '<link href="' + "ServerSideObjects('" + data.sessionId + "')" + '/AssignPump_List" rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/AssignPump_List" type="application/atom+xml;type=feed" title="AssignPump_List"/>';
    xmlData += '<link href="' + "ServerSideObjects('" + data.sessionId + "')" + '/LoadDetail_List" rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/LoadDetail_List" type="application/atom+xml;type=feed" title="LoadDetail_List"/>';
    xmlData += '<content type="application/xml">';
    xmlData += '<m:properties>';
    xmlData += '<d:SessionId>' + data.sessionId + '</d:SessionId>';

    if (data.date) {
        xmlData += '<d:Date>' + data.date + 'T00:00:00</d:Date>';
    } else {
        xmlData += '<d:Date>0000-00-00T00:00:00</d:Date>';
    }

    if (data.time) {
        xmlData += '<d:Time>' + data.time + '</d:Time>';
    }
    else {
        xmlData += '<d:Time>PT00H00M00S</d:Time>';
    }

    if (data.plantAdded) {
        xmlData += '<d:AddPlant>' + data.plantAdded + '</d:AddPlant>';
    }
    else {
        xmlData += '<d:AddPlant/>';
    }

    if (data.plantSelected) {
        xmlData += '<d:SelPlant>' + data.plantSelected + '</d:SelPlant>';
    }
    else {
        xmlData += '<d:SelPlant/>';
    }

    if (data.morePlants) {
        xmlData += '<d:MorePlants>X</d:MorePlants>';
    }
    else {
        xmlData += '<d:MorePlants/>';
    }

    if (data.refresh) {
        xmlData += '<d:Refresh>X</d:Refresh>';
    }
    else {
        xmlData += '<d:Refresh/>';
    }

    if (data.newDateTime) {
        xmlData += '<d:ChangeDateTime>X</d:ChangeDateTime>';
    }
    else {
        xmlData += '<d:ChangeDateTime/>';
    }

    if (data.IsInit) {
        xmlData += '<d:Initialize>X</d:Initialize>';
    }
    else {
        xmlData += '<d:Initialize/>';
    }

	

    if (data.setPump) {
        xmlData += '<d:SetPump>X</d:SetPump>'
        if (data.setPump == "1") {
            xmlData += '<d:PumpId></d:PumpId>'
        }
        else {
            xmlData += '<d:PumpId>' + data.setPump + '</d:PumpId>'
        }

        xmlData += '<d:PumpEndDate>' + data.pumpEndDate + '</d:PumpEndDate>'
        xmlData += '<d:PumpEndTime>' + data.pumpEndTime + '</d:PumpEndTime>'
        xmlData += '<d:PumpStartDate>' + data.pumpStartDate + '</d:PumpStartDate>'
        xmlData += '<d:PumpStartTime>' + data.pumpStartTime + '</d:PumpStartTime>'
    }

   if (data.SetDetailsHour) {
        xmlData += '<d:SetDetailsHour>X</d:SetDetailsHour>';
    }
    else {
        xmlData += '<d:SetDetailsHour/>';
    }

   if (data.DetailsHour) {
        xmlData += '<d:DetailsHour>' + data.DetailsHour + '</d:DetailsHour>';
    }
    else {
        xmlData += '<d:DetailsHour/>';
    }

    //if (data.SetFrecuency) {
    //    xmlData += '<d:SetFrecuency>X</d:SetFrecuency>';
    //}
    //else {
    //    xmlData += '<d:SetFrecuency/>';
    //}

   //if (data.Frecuency) {
   //     xmlData += '<d:Frecuency>' + data.DetailsHour + '</d:Frecuency>';
   // }
   // else {
   //     xmlData += '<d:Frecuency/>';
   // }
    
    //xmlData += '<d:HasConcrete/>';
    //xmlData += '<d:HasPumping/>';
    xmlData += '</m:properties>';
    xmlData += '</content>';
    xmlData += '</entry>';

    return xmlData;
}

Ext.define('Test43.Application', {
    name: 'Test43',

    extend: 'Ext.app.Application',
    appFolder: params.app,

    views: [
        'DispatchTree',
        'Mep',
        'GraphView',
        'LoadsPerHourView'
    ],

    controllers: [
        'Main',
        'Mep'
    ],

    models: [
        'ItemsModel',
        'OrderResource',
        'PlantModel',
        'UserPlantModel',
        'GraphDataModel',
        'GenericComboModel',
        'UserDataModel',
        'PlantListModel',
        'SessionDataModel',
        'MepListModel',
        'ChartModel',
        'PumpListModel',
        'AssignPumpModel',
        'LoadsPerHourModel',
        'Zone'
        
    ],

    stores: [
       'ItemsStore',
       'ResourceStore',
       'PlantStore',
       'UserPlantStore',
       'GraphStore',
       'GenericComboStore',
       'UserDataStore',
       'SessionDataStore',
       'LoadsPerHourStore',
       'ZoneStore'
       
    ],
    launch: function () {
        delete Ext.tip.Tip.prototype.minWidth;
    }
});
