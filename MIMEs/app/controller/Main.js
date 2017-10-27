window.filterPlant = "";
window.filterName = "";

Ext.define('Test43.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ["Ext.util.Format", "Sch.panel.SchedulerGrid"],
    refs: [
        {
            ref: 'DispatchTree',
            selector: 'dispatchTree'
        },
        {
            ref: 'GraphView',
            selector: 'graphView'
        },
        {
            ref: 'MepView',
            selector: 'mepView'
        }
    ],
    date: '',
    time: '',
    dateload: '',
    timeload: '',
    hasLoadPerHour: true,
    dateTime: new Date(),
    header: '',
    sessionId: '',
    pumpService: null,
    resourceName: '',
    hasPump: true,
    hasConcrete: true,
    selPlant: null,

    init: function (application) {
        me = this;
        this.loadUserData(params.sessionId);

    },

    putMEP: function (sessionId, header, isInit, addPlant, selectPlant, morePlants, changeDateTime, pumpId) {
      
        var data;
        var headers;

        if (!sessionId || !header) {
            return;
        }

        if (Ext.getCmp('pnlGrafica')) {
            Ext.getCmp('pnlGrafica').setLoading();
        }

        if (Ext.getCmp('mepView')) {
            Ext.getCmp('mepView').setLoading();
        }

        if (me.hasPump && !Ext.getCmp('schMain').hidden) {
            Ext.getCmp('schMain').setLoading();
        }

        data = {
            sessionId: sessionId,
            dateload: me.date,
            timeload: me.time,
            IsInit: isInit,
            plantAdded: addPlant,
            plantSelected: selectPlant,
            morePlants: morePlants,
            newDateTime: changeDateTime,
            date: me.date,
            time: me.time,
            setPump: pumpId
        };

        if (data.setPump) {
            data.pumpStartDate = getFormatedDate(me.pumpService.data.StartDate);
            data.pumpStartTime = getFormatedTime(me.pumpService.data.StartDate);
            data.pumpEndDate = getFormatedDate(me.pumpService.data.EndDate);
            data.pumpEndTime = getFormatedTime(me.pumpService.data.EndDate);
        }

        headers = { 'x-csrf-token': header, 'Content-Type': 'application/atom+xml', 'type': 'entry' };
       
        Ext.Ajax.request({
            url: params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + sessionId + "')",
            params: generateMepXML(data),
            method: 'PUT',
            headers: headers,
            callback: function (res, o, s) {
                if (o) {
                    if (o && !selectPlant) {
                        me.getMEP(me.sessionId, me.header, isInit);
                    }
                    else if (selectPlant) {

                        me.getSimpleMEP(me.sessionId, me.header, isInit);

                        if (Ext.getCmp('mepView')) {
                            Ext.getCmp('mepView').setLoading(false);
                            Ext.getCmp('schMain').setLoading(false);
                        }
                    }
                    else {
                        if (Ext.getCmp('mepView')) {
                            Ext.getCmp('mepView').setLoading(false);
                            Ext.getCmp('schMain').setLoading(false);
                        }
                    }
                }
                else {

                    if (s.responseXML.getElementsByTagName('message')[0]) {
                        Ext.MessageBox.alert('Error', s.responseXML.getElementsByTagName('message')[0].text, "");
                    }
                    me.getMEP(me.sessionId, me.header, isInit);
                }
            }
        });
    },

    getMEP: function (sessionId, header, isInit) {
        var genStore;

        genStore = Ext.getStore("SessionDataStore");
        genStore.proxy.url = params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + sessionId + "')?$expand=MEP_List,Chart_Elements,Pump_List,AssignPump_List&$format=json";

        genStore.load({
            callback: function (rec, ob, s) {         
                if (rec && rec.length > 0) {                    
                    var PumpDataRec=rec[0].data;
                    var dateAux = new Date(parseInt(PumpDataRec.Date.split('(')[1].split(')')[0]));

                    me.dateTime = new Date(dateAux.getUTCFullYear(),
                        dateAux.getUTCMonth(),
                        dateAux.getUTCDate(),
                        parseInt(trimStart(PumpDataRec.Time.replace('PT', '').split('H')[0], '0')),
                        parseInt(trimStart(PumpDataRec.Time.replace('PT', '').split('H')[1].split('M')[0]), '0'));

                    me.date = dateAux.getUTCFullYear() + '-' +
                        ((dateAux.getUTCMonth() + 1) < 10 ? '0' + (dateAux.getUTCMonth() + 1) : (dateAux.getUTCMonth() + 1).toString()) +
                        '-' + (dateAux.getUTCDate() < 10 ? '0' + dateAux.getUTCDate() : dateAux.getUTCDate().toString());
                    me.time = PumpDataRec.Time;

                    var mepCount = rec[0].MepList().data.length;
                    if (mepCount) {  
                        var data = [];                      
                        for (var i = 0; i < mepCount; i++) {
                           var aux = rec[0].MepList().data.items[i].data;
                            data.push({
                                plant: aux.Plant,
                                plant_name: aux.PlantName,
                                travel_time: aux.TravelTime.replace("PT", "").split('H')[0] + ":" + aux.TravelTime.replace("PT", "").split('H')[1].split("M")[0],
                                distance: numberWithCommas(parseFloat(aux.Distance), ',') + ' ' + aux.Unit,
                                cost: numberWithCommas(parseFloat(aux.Cost), ','),
                                isselected: aux.Mark == 'X',
                                ctp_icon: aux.CtpImage,
                                Color: aux.Color
                            });

                            if (data[i].isselected) {
                                me.selPlant = data[i];
                                //setTimmeout(me.getGrafica, 1, data[i]);
                                me.getGrafica(me.selPlant);
                            }
                            else {
                                Ext.getCmp('pnlGrafica').setLoading(false);
                            }
                        }
                        var controller = Ext.getStore('UserPlantStore');
                        controller.loadData(data);

                        if (Ext.getCmp('mepView')) {
                            Ext.getCmp('mepView').setLoading(false);
                        }
                    }
                    else {
                        Ext.getCmp('pnlGrafica').setLoading(false);
                    }

                    me.pumpService = {
                        ResourceId: (PumpDataRec.PumpId ? PumpDataRec.PumpId : 001),
                        Name: '',
                        StartDate: getFormatedDateTime(PumpDataRec.PumpStartDate,PumpDataRec.PumpStartTime),
                        EndDate: getFormatedDateTime(PumpDataRec.PumpEndDate, PumpDataRec.PumpEndTime),
                        Color: '',
                        Group: "Servicio"
                    }

                    me.resourceName = PumpDataRec.PumpDescript;

                    Ext.getCmp('txtHour').setValue(me.dateTime);

                    Ext.getCmp('txtFrom').setValue(new Date(me.dateTime));

                    me.hasConcrete = PumpDataRec.HasConcrete == 'X';
                    me.hasPump = PumpDataRec.HasPumping == 'X';

                    if (me.hasPump) {
                        Ext.getCmp('schMain').setVisible(true);
                        setTimeout(me.loadSch, 10);
                    }
                    me.setHasConcrete();
                }
            }
        });
    },

    getLoadPerHour: function (hour) {
        me.putLoads(hour, me.header);
    },

    getLoadPerHourSimple: function (hour) {
        me.putLoadsSimple(hour, me.header);
    },



    putLoads: function (hour, header) {

        var setDetailHours = true;
        data = {
            SetDetailsHour: setDetailHours,
            DetailsHour: hour
        };

        headers = { 'x-csrf-token': header, 'Content-Type': 'application/atom+xml', 'type': 'entry' };

        Ext.Ajax.request({
            url: params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + params.sessionId + "')",
            params: generateMepXML(data),
            method: 'PUT',
            headers: headers,
            callback: function (res, o, s) {

                if (data.SetDetailsHour) {
                    me.getLoads(hour, header);
                }
            }
        });
    },

    putLoadsSimple: function (hour, header) {

        var setDetailHours = true;
        data = {
            SetDetailsHour: setDetailHours,
            DetailsHour: hour
        };

        headers = { 'x-csrf-token': header, 'Content-Type': 'application/atom+xml', 'type': 'entry' };

        Ext.Ajax.request({
            url: params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + params.sessionId + "')",
            params: generateMepXML(data),
            method: 'PUT',
            headers: headers,
            callback: function (res, o, s) {

                if (data.SetDetailsHour) {
                    me.getLoadsSimple(hour, header);
                }
            }
        });
    },


    getLoads: function (hour, header) {
        var genStore;
        var befHour = hour - 1;
        var aftHour = befHour + 2;
        var aft2Hour = befHour + 3;

        if (hour == '00' || hour == '24') {
            befHour = '23';
            aftHour = '01';
            aft2Hour = '02';
        }

        if (hour == '22') {
            aft2Hour = '00';
        }

        if (hour == '23') {
            aftHour = '00';
            aft2Hour = '01';
        }

        genStore = Ext.getStore("LoadsPerHourStore");
        genStore.proxy.url = params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + params.sessionId + "')?$expand=LoadDetail_List&$format=json";
        //genStore = Ext.getStore("SessionDataStore");
        //genStore.proxy.url = params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + params.sessionId + "')?$expand=MEP_List,Chart_Elements,Pump_List,AssignPump_List,LoadDetail_List&$format=json";

         genStore.load({
        //     callback: function (rec, ob, s) {

        //         controllerLoads = Ext.getStore('LoadsPerHourStore');

        //         data = [];

        //         if (rec && rec.length > 0) {
        //             var a;
        //         }

        //     }
         });


        var objgrid1 = Ext.getCmp('gridLoadPerHour1');
        var objgrid2 = Ext.getCmp('gridLoadPerHour2');
        var objgrid3 = Ext.getCmp('gridLoadPerHour3');

        if (objgrid1 && objgrid2 && objgrid3 && genStore.proxy.reader.rawData != undefined) {
            var objLoads = Ext.getCmp('hboxLoads');
            var objPump = Ext.getCmp('panelPump');
            //var objbuttonClose = Ext.getCmp('hboxbuttonClose');

            //Show Controls
            if (objLoads) { objLoads.setVisible(true); }
            else { objLoads.setVisible(false); }

            //if(objbuttonClose){objbuttonClose.setVisible(true);}
            //else{objbuttonClose.setVisible(false);}

            if (objPump) { objPump.setVisible(false); }
            else { objPump.setVisible(true); }

            //Clean Store
            var storeLoadsPerHour1 = createExtStore();
            var storeLoadsPerHour2 = createExtStore();
            var storeLoadsPerHour3 = createExtStore();
            // storeLoadsPerHour1.loadData([], false);
            // storeLoadsPerHour2.loadData([], false);
            // storeLoadsPerHour3.loadData([], false);

            objgrid1.store.removeAll(true);
            objgrid2.store.removeAll(true);
            objgrid3.store.removeAll(true);

            //Rename Grids
            objgrid1.setTitle('<div style="text-align:center;">' + befHour + ':00 hrs ' + translations.loadA + ' ' + hour + ':00 hrs' + '</div>');
            objgrid2.setTitle('<div style="text-align:center;">' + hour + ':00 hrs ' + translations.loadA + ' ' + aftHour + ':00 hrs' + '</div>');
            objgrid3.setTitle('<div style="text-align:center;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + aftHour + ':00 hrs ' + translations.loadA + ' ' + aft2Hour + ':00 hrs' + '<a style ="color: gray; text-decoration:none; font-size: 12px" href="#" onclick="closeLoadsPerHour();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 'x' + '</a></div>');


            if (genStore.proxy.reader.rawData != undefined) {

                var lenGenStoreCount = genStore.proxy.reader.rawData.d.LoadDetail_List.results.length;
                if (lenGenStoreCount) {
                    for (var i = 0; i < lenGenStoreCount; i++) {
                        var lenGenStore = genStore.proxy.reader.rawData.d.LoadDetail_List.results[i];

                        var orderItem = lenGenStore.Order;

                        if (orderItem != '') {
                            var loadDateCom = getFormatedDateShort(lenGenStore.LoadDate);
                            var reqDateCom = getFormatedDateShort(lenGenStore.ReqDate);
                            var delDateCom = getFormatedDateShort(lenGenStore.ReqDate);
                        } else {
                            var loadDateCom = "";
                            var reqDateCom = "";
                            var delDateCom = "";
                        }

                        var loadTime = lenGenStore.LoadTime;
                        var hourItem = loadTime.replace('PT', '').split('H')[0];
                        var minItem = loadTime.replace('PT', '').split('H')[1].split('M')[0];

                        var reqTime = lenGenStore.ReqTime;
                        var hourReq = reqTime.replace('PT', '').split('H')[0];
                        var minReq = reqTime.replace('PT', '').split('H')[1].split('M')[0];

                        var TT = lenGenStore.TravelTime;
                        var hourTT = TT.replace('PT', '').split('H')[0];
                        var minTT = TT.replace('PT', '').split('H')[1].split('M')[0];



                        //Items per hour
                        if (hourItem == befHour) {
                            storeLoadsPerHour1.add({
                                SessionId: lenGenStore.SessionId,
                                Order: lenGenStore.Order,
                                Item: lenGenStore.Item,
                                SimuLoadflg: lenGenStore.SimuLoadflg,
                                //LoadDate: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].LoadDate,
                                //LoadTime: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].LoadTime,
                                LoadDate: loadDateCom,
                                LoadTime: hourItem + ':' + minItem,
                                Posex: lenGenStore.Posex,
                                Quantity: lenGenStore.Quantity,
                                Status: lenGenStore.Status,
                                MatNum: lenGenStore.MatNum,
                                MatDesc: lenGenStore.MatDesc,
                                //ReqDate: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].ReqDate,
                                //ReqTime: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].ReqTime,
                                ReqDate: reqDateCom,
                                ReqTime: hourReq + ':' + minReq,
                                Plant: lenGenStore.Plant,
                                Customer: lenGenStore.Customer,
                                CustoDesc: lenGenStore.CustoDesc,
                                Jobsite: lenGenStore.Jobsite,
                                JobstDesc: lenGenStore.JobstDesc,
                                StatusDesc: lenGenStore.StatusDesc,
                                SimuLoadflg: lenGenStore.SimuLoadflg,
                                TravelTime: hourTT + ':' + minTT

                            });
                        }

                        if (hourItem == hour) {
                            storeLoadsPerHour2.add({
                                SessionId: lenGenStore.SessionId,
                                Order: lenGenStore.Order,
                                Item: lenGenStore.Item,
                                SimuLoadflg: lenGenStore.SimuLoadflg,
                                //LoadDate: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].LoadDate,
                                //LoadTime: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].LoadTime,
                                LoadDate: loadDateCom,
                                LoadTime: hourItem + ':' + minItem,
                                Posex: lenGenStore.Posex,
                                Quantity: lenGenStore.Quantity,
                                Status: lenGenStore.Status,
                                MatNum: lenGenStore.MatNum,
                                MatDesc: lenGenStore.MatDesc,
                                //ReqDate: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].ReqDate,
                                //ReqTime: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].ReqTime,
                                ReqDate: reqDateCom,
                                ReqTime: hourReq + ':' + minReq,
                                Plant: lenGenStore.Plant,
                                Customer: lenGenStore.Customer,
                                CustoDesc: lenGenStore.CustoDesc,
                                Jobsite: lenGenStore.Jobsite,
                                JobstDesc: lenGenStore.JobstDesc,
                                StatusDesc: lenGenStore.StatusDesc,
                                SimuLoadflg: lenGenStore.SimuLoadflg,
                                TravelTime: hourTT + ':' + minTT
                            });
                        }

                        if (hourItem == aftHour) {
                            storeLoadsPerHour3.add({
                                SessionId: lenGenStore.SessionId,
                                Order: lenGenStore.Order,
                                Item: lenGenStore.Item,
                                SimuLoadflg: lenGenStore.SimuLoadflg,
                                //LoadDate: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].LoadDate,
                                //LoadTime: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].LoadTime,
                                LoadDate: loadDateCom,
                                LoadTime: hourItem + ':' + minItem,
                                Posex: lenGenStore.Posex,
                                Quantity: lenGenStore.Quantity,
                                Status: lenGenStore.Status,
                                MatNum: lenGenStore.MatNum,
                                MatDesc: lenGenStore.MatDesc,
                                //ReqDate: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].ReqDate,
                                //ReqTime: genStore.proxy.reader.rawData.d.LoadDetail_List.results[i].ReqTime,
                                ReqDate: reqDateCom,
                                ReqTime: hourReq + ':' + minReq,
                                Plant: lenGenStore.Plant,
                                Customer: lenGenStore.Customer,
                                CustoDesc: lenGenStore.CustoDesc,
                                Jobsite: lenGenStore.Jobsite,
                                JobstDesc: lenGenStore.JobstDesc,
                                StatusDesc: lenGenStore.StatusDesc,
                                SimuLoadflg: lenGenStore.SimuLoadflg,
                                TravelTime: hourTT + ':' + minTT
                            });
                        }




                    }
                }
            }
            objgrid1.getView().bindStore(storeLoadsPerHour1);
            objgrid2.getView().bindStore(storeLoadsPerHour2);
            objgrid3.getView().bindStore(storeLoadsPerHour3);

            objgrid1.getView().refresh();
            objgrid2.getView().refresh();
            objgrid3.getView().refresh();
        }
    },


    getLoadsSimple: function (hour, header) {
        var genStore;
        var befHour = hour - 1;
        var aftHour = befHour + 2;
        var aft2Hour = befHour + 3;

        genStore = Ext.getStore("LoadsPerHourStore");
        genStore.proxy.url = params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + params.sessionId + "')?$expand=LoadDetail_List&$format=json";
        //genStore = Ext.getStore("SessionDataStore");
        //genStore.proxy.url = params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + params.sessionId + "')?$expand=MEP_List,Chart_Elements,Pump_List,AssignPump_List,LoadDetail_List&$format=json";

        genStore.load({
            callback: function (rec, ob, s) {

                // controllerLoads = Ext.getStore('LoadsPerHourStore');

                // data = [];

                // if (rec && rec.length > 0) {
                //     var a;
                //     //console.log('alert');
                // }

            }
        });


        var objgrid1 = Ext.getCmp('gridLoadPerHour1');
        var objgrid2 = Ext.getCmp('gridLoadPerHour2');
        var objgrid3 = Ext.getCmp('gridLoadPerHour3');

        // if (objgrid1 && objgrid2 && objgrid3 && genStore.proxy.reader.rawData != undefined) {
        //     //console.log('loads');
        //     var b;
        // }
    },


    getSimpleMEP: function (sessionId, header, isInit) {
        var genStore;

        genStore = Ext.getStore("SessionDataStore");
        genStore.proxy.url = params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + sessionId + "')?$expand=MEP_List,Chart_Elements&$format=json";

        genStore.load({
            callback: function (rec, ob, s) {
                var dateAux;
                if (rec && rec.length > 0) {
                    var simpleData = rec[0].data;

                    dateAux = new Date(parseInt(simpleData.Date.split('(')[1].split(')')[0]));

                    me.dateTime = new Date(dateAux.getUTCFullYear(),
                        dateAux.getUTCMonth(),
                        dateAux.getUTCDate(),
                        parseInt(trimStart(simpleData.Time.replace('PT', '').split('H')[0], '0')),
                        parseInt(trimStart(simpleData.Time.replace('PT', '').split('H')[1].split('M')[0]), '0'));

                    me.date = dateAux.getUTCFullYear() + '-' +
                        ((dateAux.getUTCMonth() + 1) < 10 ? '0' + (dateAux.getUTCMonth() + 1) : (dateAux.getUTCMonth() + 1).toString()) +
                        '-' + (dateAux.getUTCDate() < 10 ? '0' + dateAux.getUTCDate() : dateAux.getUTCDate().toString());
                    me.time = simpleData.Time;

                    Ext.getCmp('txtHour').setValue(me.dateTime);
                    Ext.getCmp('txtFrom').setValue(new Date(me.dateTime));

                    me.hasConcrete = simpleData.HasConcrete == 'X';
                    me.hasPump = simpleData.HasPumping == 'X';
                }
            }
        });
    },

    getGrafica: function (plant) {
        var genStore;
        var sessionStore;
        var charData;
        var auxData;
        var lastLoadPerHour;
        var timeAux;
        var loadInTime;
        var decimalTime;
        var loadTime;
        var auxTime;

        if (!plant) { plant = me.selPlant; }

        genStore = Ext.getStore("GraphStore");
        sessionStore = Ext.getStore("SessionDataStore");
        charData = [];

        if (Ext.getStore('SessionDataStore').data.items.length) {
            auxData = Ext.getStore('SessionDataStore').data.items[0].ChartList().data.items;
            var auxCount=auxData.length;

            for (var i = 0; i < auxCount; i++) {
                if (auxData[i].data.Plant == plant.plant) {
                    auxItemData = auxData[i].data;

                    auxTime = auxItemData.Time.replace('PT', '').split('H');
                    timeAux = parseFloat(auxTime[0]) + (auxTime[1].split('M')[0] * 0.01666);

                    charData.push(
                        {
                            time: timeAux,
                            loads_per_hour_avail:auxItemData.LoadsPerHourAvail,
                            available_vehicles: auxItemData.VehicleAvail,
                            simulated_loads: auxItemData.SimulatedLoads,
                            existing_loads: auxItemData.ExistingLoads,
                            vehicle_count: auxItemData.VehicleCount,
                            plant: auxItemData.Plant,
                            loadAdded: auxItemData.SimultaneousLoads,
                            baseLine: 0
                        });
                }
            }

            genStore.suspendEvents(true);
            genStore.loadData(charData);

            Test43.app.getController('Main').setGraphTitle(plant.plant + ' - ' + plant.plant_name);


            //setTimeout(me.resumeGraphEvents, 10);
            me.resumeGraphEvents();

        }
    },

    resumeGraphEvents: function () {
        var genStore;

        genStore = Ext.getStore("GraphStore");

        genStore.resumeEvents();

        Ext.getCmp('pnlGrafica').setLoading(false);
    },

    addPlant: function (plant) {
        this.putMEP(this.sessionId, this.header, false, plant.split('-')[0].substring(0, 4));
    },

    masPlantas: function () {
        this.putMEP(this.sessionId, this.header, false, '', '', true);
    },

    setHasConcrete: function () {
        var cmbPlant;
        var btnAddPlant;
        var btnMorePlants;
        var grdPlants;
        var pnlGrafica;

        cmbPlant = Ext.getCmp("cmbPlants");
        btnAddPlant = Ext.getCmp("btnAddPlant");
        btnMorePlants = Ext.getCmp("btnMorePlants");
        grdPlants = Ext.getCmp("grdUserPlants");
        pnlGrafica = Ext.getCmp("pnlGrafica");

        if (me.hasConcrete) {

        } else {
            cmbPlant.setDisabled(true);
            btnAddPlant.setDisabled(true);
            btnMorePlants.setDisabled(true);
            grdPlants.setDisabled(true);
            pnlGrafica.setDisabled(true);
        }
    },

    setPump: function (pumpId) {
        this.putMEP(this.sessionId, this.header, false, '', '', false, false, pumpId);
    },

    changeDateTime: function (date, time) {
        me.date = date.getFullYear() + '-' +
            ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString()) +
            '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString());
        me.time = 'PT' + time.getHours() + 'H' + time.getMinutes() + 'M00S';

        this.putMEP(this.sessionId, this.header, false, '', '', false, true);
    },

    selectPlant: function (plant) {
        this.putMEP(this.sessionId, this.header, false, '', plant, false);
    },

    loadUserData: function (sessionId) {
        Ext.Ajax.request(
            {
                url: params.baseUrl + "sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_INITLOAD/Settings('" + sessionId + "')?$expand=Plant_List&$format=json",
                method: 'GET',
                headers: { 'X-CSRF-Token': 'Fetch' },
                withCredentials: true,
                callback: function (res, o, s) {
                    var header;
                    var response;
                    var genStore;
                    var plants;
                    var _description = "";

                    if (!o) {
                        return;
                    }

                    header = s.getResponseHeader("x-csrf-token");
                    response = Ext.JSON.decode(s.responseText).d;
                    genStore = Ext.getStore("PlantStore");
                    plants = [];

                    var ResLength = response.Plant_List.results.length;
                    for (var i = 0; i < ResLength; i++) {
                        var data = response.Plant_List.results[i];

                        _description =  data.Descr == "" ? _description :
                                        data.Descr.length > 13 ? data.Descr.substring(0, 13) + "..." :
                                        ' - ' + data.Descr;                                        
                        plants.push({
                            Id: data.PlantCode,
                            Name: data.PlantCode + _description
                        });
                    }

                    genStore.loadData(plants);

                    me.sessionId = sessionId;
                    me.header = header;

                    params.dateFormat = response.DateFormat;
                    params.isBatcher = response.IsBatcher;

                    if (response.ShowCost) {
                        me.showCostColumn(response.ShowCost);
                    }

                    me.setBatcherMode(params.isBatcher);
                    me.putMEP(sessionId, header, true);
                }
            });
    },

    showCostColumn: function (show) {
        if (show) {
            Ext.getCmp('grdUserPlants').columns[5].setVisible(true);

            Ext.getCmp('grdUserPlants').columns[1].width = '11%';
            Ext.getCmp('grdUserPlants').columns[2].width = '25%';
            Ext.getCmp('grdUserPlants').columns[3].width = '15%';
            Ext.getCmp('grdUserPlants').columns[4].width = '15%';
            Ext.getCmp('grdUserPlants').columns[5].width = '17%';
            Ext.getCmp('grdUserPlants').columns[6].width = '10%';
        }
    },

    setBatcherMode: function (isBatcher) {
        if (isBatcher) {
            Ext.getCmp('cmbPlants').setDisabled(true);
            Ext.getCmp('btnAddPlant').setDisabled(true);
            Ext.getCmp('btnMorePlants').setDisabled(true);
        }
        else {
            Ext.getCmp('cmbPlants').setDisabled(false);
            Ext.getCmp('btnAddPlant').setDisabled(false);
            Ext.getCmp('btnMorePlants').setDisabled(false);
        }
    },

    setModeReadOnly: function (isReadOnly) {
        if (isReadOnly) {
            Ext.getCmp('cmbPlants').setDisabled(true);
            Ext.getCmp('btnAddPlant').setDisabled(true);
            Ext.getCmp('btnMorePlants').setDisabled(true);

            Ext.getCmp('btnMenosMes').setDisabled(true);
            Ext.getCmp('txtFrom').setDisabled(true);
            Ext.getCmp('btnMasMes').setDisabled(true);

            Ext.getCmp('btnMenosHora').setDisabled(true);
            Ext.getCmp('txtHour').setDisabled(true);
            Ext.getCmp('btnMasHora').setDisabled(true);

            Ext.getCmp('txtFrecuencia').setDisabled(true);
        }
        else {
            Ext.getCmp('cmbPlants').setDisabled(false);
            Ext.getCmp('btnAddPlant').setDisabled(false);
            Ext.getCmp('btnMorePlants').setDisabled(false);

            Ext.getCmp('btnMenosMes').setDisabled(false);
            Ext.getCmp('txtFrom').setDisabled(false);
            Ext.getCmp('btnMasMes').setDisabled(false);

            Ext.getCmp('btnMenosHora').setDisabled(false);
            Ext.getCmp('txtHour').setDisabled(false);
            Ext.getCmp('btnMasHora').setDisabled(false);

            Ext.getCmp('txtFrecuencia').setDisabled(false);
        }
    },

    setGraphTitle: function (plant) {
        var title;

        title = translations.GraphTitle + ': ' + plant;

        Ext.getCmp('pnlGrafica').setTitle(title);
    },

    loadSch: function () {
        var node;
        var genStore;
        var aux;
        var data;
        var itemsStore;
        var itemsData;
        var sched;
        var zoneStore;
        var zone;

        var ns = Ext.getStore("ResourceStore");
        genStore = Ext.getStore("SessionDataStore");
        zoneStore = Ext.getStore("ZoneStore");
        itemsStore = Ext.getStore("ItemsStore");
        sched = Ext.getCmp("schPumpService");
        data = [];
        itemsData = [];
        zone = [];

        data.push({
            Id: 001,
            Name: me.resourceName,
            Status: "",
            iPlant: ""
        });

        if (genStore.data.items[0].PumpListStore.data.items.length) {
            aux = genStore.data.items[0].PumpListStore.data.items;

            for (var i = 0; i < aux.length; i++) {
                data.push({
                    Id: aux[i].data.EquipId,
                    Name: aux[i].data.EquipName,
                    Status: aux[i].data.Status,
                    iPlant: aux[i].data.Plant
                });

            }
        }

        //ns.suspendEvents(true);

        ns.loadData(data);
        var resourceStorev = Ext.getStore("ResourceStore");
        if (window.filterName == "" && window.filterPlant == "") {
            resourceStorev.clearFilter();
        } else {
            resourceStorev.filterBy(function (rec, id) {
                if ((rec.raw['Name'].indexOf(window.filterName) >= 0 && rec.raw['iPlant'].indexOf(window.filterPlant) >= 0) || rec.raw['iPlant'] == '') {
                    return true;
                } else {
                    return false;
                }
            });
        }
        //ns.resumeEvents();

        aux = genStore.data.items[0].AssignPumpStore.data.items;


        if (me.pumpService) {
            itemsData.push(me.pumpService);
        }
        else {
            itemsData.push({
                ResourceId: 001,
                Name: '',
                iPlant: "OLA",
                StartDate: me.dateTime,
                EndDate: addMinutes(me.dateTime, 30),
                Color: '',
                Group: "Servicio"
            });
        }

        if (aux.length) {
            for (var i = 0; i < aux.length; i++) {
                itemsData.push({
                    ResourceId: aux[i].data.EquipId,
                    Name: '',
                    iPlant: 'OLA',
                    StartDate: getFormatedDateTime(aux[i].data.FromDate, aux[i].data.FromTime),
                    EndDate: getFormatedDateTime(aux[i].data.ToDate, aux[i].data.ToTime),
                    Color: aux[i].data.Color
                })
            }
        }

        if (sched) {

            if (me.pumpService) {
                sched.switchViewPreset('hourAndDay',
                    new Date(itemsData[0].StartDate.getFullYear(), itemsData[0].StartDate.getMonth(), itemsData[0].StartDate.getDate(), 0),
                    new Date(itemsData[0].StartDate.getFullYear(), itemsData[0].StartDate.getMonth(), itemsData[0].StartDate.getDate() + 1, 0));
            }
            else {
                sched.switchViewPreset('hourAndDay',
                    new Date(me.dateTime.getFullYear(), me.dateTime.getMonth(), me.dateTime.getDate(), 0),
                    new Date(me.dateTime.getFullYear(), me.dateTime.getMonth(), me.dateTime.getDate() + 1, 0));
            }

            sched = sched.getSchedulingView();
            sched.setTimeResolution(Sch.util.Date.MINUTE, 5);
        }

        itemsStore.loadData(itemsData);

        me.pumpService = itemsStore.data.items[0];

        Ext.getCmp('schMain').setLoading(false);

        Ext.getCmp('sldSchedule').setValue(((itemsData[0].StartDate.getHours() - 1) * 12) + (itemsData[0].StartDate.getMinutes() / 5));

        zone.push(
            {
                StartDate: itemsData[0].StartDate,
                EndDate: itemsData[0].EndDate,
                Type: "",
                Cls: 'myZoneStyle'
            });

        zoneStore.loadData(zone);
        Ext.getCmp("txtSchHour").setValue(itemsData[0].StartDate);

        sched.scrollEventIntoView(itemsStore.data.items[0], true);
    }
});


function getFormatedDateTime(date, time) {
    var localDate;
    var utcTime;
    var hour;
    var minutes;

    hour = trimStart(time.replace('PT', '').split('H')[0], '0');
    minutes = trimStart(time.replace('PT', '').split('H')[1].split('M')[0], '0');

    if (date) {
        var dateAux = new Date(parseInt(date.split('(')[1].split(')')[0]));

        localDate = new Date(dateAux.getUTCFullYear(),
            dateAux.getUTCMonth(),
            dateAux.getUTCDate(),
            parseInt(hour),
            parseInt(minutes));
    }

    return localDate;
}

function getFormatedDateShort(date) {
    var localDate;
    var utcTime;

    if (date) {
        var dateAux = new Date(parseInt(date.split('(')[1].split(')')[0]));

        localDate = new Date(dateAux.getUTCFullYear(),
            dateAux.getUTCMonth(),
            dateAux.getUTCDate());
    }

    return localDate.getDate() + '/' + localDate.getMonth() + '/' + localDate.getFullYear();
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function trimStart(str, char) {
    var aux;

    aux = str;

    while (aux.substring(0, 1) == char && aux.length > 1) {
        aux = aux.substring(1, aux.length);
    }

    return aux;
}

function getFormatedDate(date) {
    var aux;

    aux = date.getFullYear() + '-' +
        ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString()) +
        '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString()) + "T00:00:00";

    return aux;
}


function getFormatedTime(time) {
    var aux;

    aux = 'PT' + time.getHours() + 'H' + time.getMinutes() + 'M00S';

    return aux;
}


function closeLoadsPerHour() {
    var objLoads = Ext.getCmp('hboxLoads');
    var objPump = Ext.getCmp('panelPump');
    var objbuttonClose = Ext.getCmp('hboxbuttonClose');

    if (objLoads) { objLoads.setVisible(false); }
    else { objLoads.setVisible(true); }

    if (objPump) { objPump.setVisible(true); }
    else { objPump.setVisible(false); }

    var objgrid1 = Ext.getCmp('gridLoadPerHour1');
    var objgrid2 = Ext.getCmp('gridLoadPerHour2');
    var objgrid3 = Ext.getCmp('gridLoadPerHour3');


    //Clean Store
    storeLoadsPerHour1.loadData([], false);
    storeLoadsPerHour2.loadData([], false);
    storeLoadsPerHour3.loadData([], false);

    objgrid1.store.removeAll(true);
    objgrid2.store.removeAll(true);
    objgrid3.store.removeAll(true);
}

function createExtStore(){
    return Ext.create('Ext.data.Store', {
        alias: 'store.PruebaStore',
            autoLoad: false,
            fields:['SessionId', 'Order', 'Item','SimuLoadflg','LoadDate', 'LoadTime', 'Posex','Quantity', 'Status', 'MatNum','MatDesc', 'ReqDate', 'ReqTime', 'Plant', 'Customer', 'CustoDesc', 'Jobsite', 'JobstDesc','TravelTime','StatusDesc','SimuLoadflg'],
        data: []
    });
}