Ext.define('Test43.view.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',
    items: [
        {
            xtype: 'container',
            height: '100%',
            items: [
                {
                    layout: 'hbox',
                    border: false,
                    height: '35%',
                    minHeight: 300,
                    items: [
                        {
                            xtype: 'mep',
                            id: 'mepView',
                            flex: 3,
                            //closable: false,
                            width: '40%'
                        },
                        {
                            xtype: 'graphview',
                            title: translations.GraphTitle,
                            width: '65%',
                            id: 'pnlGrafica',
                            margins: { top: 5, left: 5, right: 5, bottom: 5 }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: 'panelPump',
                    title: translations.SchTitle,
                    tools: [
                        {
                            xtype: 'sliderfield',
                            width: '70%',
                            value: 50,
                            id: 'sldSchedule',
                            increment: 1,
                            minValue: 0,
                            maxValue: 275,
                            hidden: getTridentVerssion() > 5,
                            tipText: function (thumb) {
                                var mins;
                                var newDate;
                                var oldDate;
                                var mainCont;
                                var newStopDate;
                                var minDiff;
                                var oldEndDate;
                                var eventStore;

                                mainCont = Test43.app.getController('Main');

                                oldDate = mainCont.pumpService.data.StartDate;
                                oldEndDate = mainCont.pumpService.data.EndDate;

                                mins = thumb.value * 5;

                                while (mins >= 60) {
                                    mins -= 60;
                                }

                                return ((thumb.value * 5) / 60).toFixed(0) + ":" + (mins < 10 ? ("0" + mins) : mins);
                            },
                            listeners:
                            {
                                changecomplete: function (s, newValue, thumb, ops) {
                                    var mins;
                                    var newDate;
                                    var oldDate;
                                    var mainCont;
                                    var newStopDate;
                                    var minDiff;
                                    var oldEndDate;
                                    var zone = Ext.getStore("ZoneStore").data.items[0];

                                    mainCont = Test43.app.getController('Main');

                                    oldDate = mainCont.pumpService.data.StartDate;
                                    oldEndDate = mainCont.pumpService.data.EndDate;

                                    mins = thumb.value * 5;

                                    while (mins >= 60) {
                                        mins -= 60;
                                    }

                                    newDate = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate(), ((thumb.value * 5) / 60).toFixed(0), mins);

                                    mainCont.pumpService.setStartDate(newDate);

                                    minDiff = (((newDate.getHours() - oldDate.getHours()) * 60) + (newDate.getMinutes() - oldDate.getMinutes()));

                                    newStopDate = addMinutes(oldEndDate, minDiff);

                                    mainCont.pumpService.setEndDate(newStopDate);

                                    mainCont.setPump(mainCont.pumpService.data.ResourceId);

                                    zone.setStartDate(newDate);
                                    zone.setEndDate(newStopDate);

                                    Ext.getCmp("txtSchHour").setValue(newDate);
                                }
                            }
                        },
                        {
                            xtype: 'timefield',
                            id: 'txtSchHour',
                            width: '15%',
                            format: 'H:i',
                            increment: 5,
                            margins: { left: 5 },
                            hidden: getTridentVerssion() > 5,
                            listeners: {
                                select: function () {
                                    var newDate;
                                    var mainCont;
                                    var oldDate;
                                    var minDiff;
                                    var newEndTime;
                                    var oldEndDate;
                                    var newStopDate;
                                    var zone = Ext.getStore("ZoneStore").data.items[0];

                                    newDate = Ext.getCmp("txtSchHour").value;
                                    mainCont = Test43.app.getController('Main');

                                    oldDate = mainCont.pumpService.data.StartDate;
                                    oldEndDate = mainCont.pumpService.data.EndDate;

                                    minDiff = (((newDate.getHours() - oldDate.getHours()) * 60) + (newDate.getMinutes() - oldDate.getMinutes()));

                                    newDate = addMinutes(new Date(mainCont.pumpService.data.StartDate), minDiff);

                                    newStopDate = addMinutes(oldEndDate, minDiff);

                                    mainCont.pumpService.setStartDate(newDate);

                                    mainCont.pumpService.setEndDate(newStopDate);

                                    zone.setStartDate(newDate);
                                    zone.setEndDate(newStopDate);

                                    mainCont.setPump(mainCont.pumpService.data.ResourceId);
                                }
                            }
                        }
                    ],
                    width: '100%',
                    //minHeight: 350,
                    margins: { top: 0, left: 10, right: 10, bottom: 10 },
                    padding: { top: 5, left: 5, right: 5, bottom: 5 },
                    items: [
                        {
                            xtype: 'dispatchtree',
                            padding: { top: 5, left: 5, right: 5, bottom: 5 },
                            id: "schMain",
                            hidden: true
                            //minHeight: 330
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    id: 'hboxLoads',
                    hidden: true,
                    width: '100%',
                    border: false,
                    height: 225,
                    margins: { top: 0, left: 0, right: 0, bottom: 0 },
                    padding: { top: 0, left: 3, right: 2, bottom: 0 },
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'gridLoadPerHour1',
                            //title: "8:00 hrs to 9:00 hrs",
                            title: 'GridPanel <span style ="margin-left: 620px"><img class="Some class" src> Accept</span>',
                            width: '33%',
                            height: 223,
                            enableColumnHide: false,
                            //store: 'Load1',
                            margins: { top: 0, left: 0, right: 0, bottom: 0 },
                            padding: { top: 0, left: 0, right: 0, bottom: 0 },
                            columns: [

                                { text: "Hr.", width: 40, dataIndex: 'LoadTime', sortable: false, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: translations.loadOrden, width: 100, dataIndex: 'Order', sortable: false, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: translations.loadProd, width: 73, dataIndex: 'MatDesc', sortable: false, autoSizeColumn: false, maxWidth: 73, tdCls: 'some-row-class' },
                                { text: "Vol.", width: 40, dataIndex: 'Quantity', sortable: false, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: translations.loadObra, width: 120, dataIndex: 'JobstDesc', sortable: false, autoSizeColumn: true, maxWidth: 120, tdCls: 'some-row-class' },
                                { text: "T.T.", width: 40, dataIndex: 'TravelTime', sortable: false, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                //{text: "Col2", hidden:true, width: 100, dataIndex: 'Col2', sortable: true, autoSizeColumn: false, maxWidth: 65,
                                //  	renderer: function (value, metaData, record) {
                                //                return '<img src="' + params.schPath + '/icons/' + value + '" />';
                                //            }
                                //}
                                { text: "SessionId", hidden: true, dataIndex: 'SessionId', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Item", hidden: true, width: 100, dataIndex: 'Item', sortable: true, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                { text: "SimuLoadflg", hidden: true, width: 100, dataIndex: 'SimuLoadflg', sortable: true, autoSizeColumn: false, maxWidth: 60 },
                                { text: "Posex", hidden: true, width: 100, dataIndex: 'Posex', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Status", hidden: true, width: 100, dataIndex: 'Status', sortable: true, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                { text: "MatNum", hidden: true, width: 100, dataIndex: 'MatNum', sortable: true, autoSizeColumn: false, maxWidth: 60 },
                                { text: "ReqDate", hidden: true, width: 100, dataIndex: 'ReqDate', sortable: true, autoSizeColumn: false, maxWidth: 65 },
                                { text: "ReqTime", hidden: true, width: 100, dataIndex: 'ReqTime', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Plant", hidden: true, width: 100, dataIndex: 'Plant', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Customer", hidden: true, width: 100, dataIndex: 'Customer', sortable: true, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                { text: "CustoDesc", hidden: true, width: 100, dataIndex: 'CustoDesc', sortable: true, autoSizeColumn: false, maxWidth: 60 },
                                { text: "StatusDesc", hidden: true, width: 100, dataIndex: 'StatusDesc', sortable: true, autoSizeColumn: false, maxWidth: 65 },
                                { text: "Jobsite", hidden: true, width: 100, dataIndex: 'Jobsite', sortable: true, autoSizeColumn: false, maxWidth: 65 },
                                { text: "SimuLoadflg", hidden: true, width: 100, dataIndex: 'SimuLoadflg', sortable: true, autoSizeColumn: false, maxWidth: 65 }
                                //,
                                //{text: "Col1", hidden:true, width: 100, dataIndex: 'Col1', sortable: true, autoSizeColumn: false, maxWidth: 65},

                            ],
                            viewConfig: {
                                enableTextSelection: true,

                                getRowClass: function (record, index) {
                                    if (record.get('SimuLoadflg') == "") {
                                        return "blanco";
                                    }
                                    else {
                                        return "naranja";
                                    }

                                    //if (record.get('Quantity') > 6) {
                                    //  return "blanco";
                                    //}
                                    //else {
                                    //  return "rojo";
                                    //}
                                }
                            },

                            listeners:
                            {
                                itemmouseenter: function (view, record, item, index, e, options) {
                                    var remarks = record.get('remarks');
                                    var view = this.getView();
                                    view.tip = Ext.create('Ext.tip.ToolTip', {
                                        delegate: view.itemSelector,
                                        trackMouse: true,
                                        renderTo: Ext.getBody(),
                                        target: view.el,
                                        dismissDelay: 0,
                                        listeners:
                                        {
                                            beforeshow: function updateTipBody(tip) {
                                                tip.update('<body><table width="350px" eight="250px"><tr style="color:#084B8A; font-weight: bold"><td width="30%">' + translations.loadNumeroOrden + '</td><td width="50%">' + record.data.Order + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%">' + translations.loadCarga + '</td><td width="50%">' + record.data.Posex + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%">' + translations.loadEstatus + '</td><td width="50%">' + record.data.StatusDesc + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%">' + translations.loadProducto + '</td><td  width="50%">' + record.data.MatNum + '</td><td width="20%">&nbsp;</td></tr></table><br /><table width="100%"><tr><td width="30%">' + translations.loadEntrega + '</td><td width="30%"><span style="font-style:italic">' + translations.loadDate + ': ' + '</span>' + record.data.ReqDate + '</td><td width="40%"><span style="font-style:italic">' + translations.loadTime + ': ' + '</span>' + record.data.ReqTime + '</td></tr><tr><td width="30%">' + translations.loadCarga + '</td><td width="30%"><span style="font-style:italic">' + translations.loadDate + ': ' + '</span>' + record.data.LoadDate + '</td><td width="40%"><span style="font-style:italic">' + translations.loadTime + ': ' + '</span>' + record.data.LoadTime + '</td></tr><tr><td width="30%">' + translations.loadRequerida + '</td><td width="30%"><span style="font-style:italic">' + translations.loadDate + ': ' + '</span> ' + record.data.ReqDate + '</td><td width="40%"><span style="font-style:italic">' + translations.loadTime + ': ' + '</span> ' + record.data.ReqTime + '</td></tr></table><br /><table width="100%"><tr><td width="30%">' + translations.loadPlanta + '</td><td width="50%">' + record.data.Plant + '</td><td width="20%"></td></tr><tr><td width="30%" style="vertical-align:text-top">' + translations.loadCliente + '</td><td width="50%">' + record.data.Customer + ' - ' + record.data.CustoDesc + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%" style="vertical-align:text-top">' + translations.loadObra + '</td><td width="50%">' + record.data.Jobsite + ' - ' + record.data.JobstDesc + '</td><td width="20%">&nbsp;</td></tr></table></body>');
                                            }
                                        }
                                    }
                                    );
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'gridLoadPerHour2',
                            title: "9:00 hrs to 10:00 hrs",
                            width: '34%',
                            height: 223,
                            enableColumnHide: false,
                            //store: 'Load2',
                            margins: { top: 0, left: 0, right: 0, bottom: 0 },
                            padding: { top: 0, left: 0, right: 0, bottom: 0 },
                            columns: [
                                { text: "Hr.", width: 40, dataIndex: 'LoadTime', sortable: false, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: translations.loadOrden, width: 100, dataIndex: 'Order', sortable: false, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: translations.loadProd, width: 73, dataIndex: 'MatDesc', sortable: false, autoSizeColumn: false, maxWidth: 73, tdCls: 'some-row-class' },
                                { text: "Vol.", width: 40, dataIndex: 'Quantity', sortable: false, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: translations.loadObra, width: 120, dataIndex: 'JobstDesc', sortable: false, autoSizeColumn: true, maxWidth: 120, tdCls: 'some-row-class' },
                                { text: "T.T.", width: 40, dataIndex: 'TravelTime', sortable: false, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                //{text: "Col2", hidden:true, width: 100, dataIndex: 'Col2', sortable: true, autoSizeColumn: false, maxWidth: 65,
                                //	renderer: function (value, metaData, record) {
                                //                return '<img src="' + params.schPath + '/icons/' + value + '" />';
                                //            }
                                //}
                                { text: "SessionId", hidden: true, dataIndex: 'SessionId', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Item", hidden: true, width: 100, dataIndex: 'Item', sortable: true, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                { text: "SimuLoadflg", hidden: true, width: 100, dataIndex: 'SimuLoadflg', sortable: true, autoSizeColumn: false, maxWidth: 60 },
                                { text: "Posex", hidden: true, width: 100, dataIndex: 'Posex', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Status", hidden: true, width: 100, dataIndex: 'Status', sortable: true, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                { text: "MatNum", hidden: true, width: 100, dataIndex: 'MatNum', sortable: true, autoSizeColumn: false, maxWidth: 60 },
                                { text: "ReqDate", hidden: true, width: 100, dataIndex: 'ReqDate', sortable: true, autoSizeColumn: false, maxWidth: 65 },
                                { text: "ReqTime", hidden: true, width: 100, dataIndex: 'ReqTime', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Plant", hidden: true, width: 100, dataIndex: 'Plant', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Customer", hidden: true, width: 100, dataIndex: 'Customer', sortable: true, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                { text: "CustoDesc", hidden: true, width: 100, dataIndex: 'CustoDesc', sortable: true, autoSizeColumn: false, maxWidth: 60 },
                                { text: "StatusDesc", hidden: true, width: 100, dataIndex: 'StatusDesc', sortable: true, autoSizeColumn: false, maxWidth: 65 },
                                { text: "Jobsite", hidden: true, width: 100, dataIndex: 'Jobsite', sortable: true, autoSizeColumn: false, maxWidth: 65 },
                                { text: "SimuLoadflg", hidden: true, width: 100, dataIndex: 'SimuLoadflg', sortable: true, autoSizeColumn: false, maxWidth: 65 }
                                //,
                                //{text: "Col1", hidden:true, width: 100, dataIndex: 'Col1', sortable: true, autoSizeColumn: false, maxWidth: 65},
                            ],
                            viewConfig: {
                                enableTextSelection: true,

                                getRowClass: function (record, index) {
                                    if (record.get('SimuLoadflg') == "") {
                                        return "dashed";
                                    }
                                    else {
                                        return "naranja";
                                    }

                                    //if (record.get('Quantity') > 6) {
                                    //  return "blanco";
                                    //}
                                    //else {
                                    //  return "rojo";
                                    //}
                                }
                            },

                            listeners:
                            {
                                itemmouseenter: function (view, record, item, index, e, options) {
                                    var remarks = record.get('remarks');
                                    var view = this.getView();
                                    view.tip = Ext.create('Ext.tip.ToolTip', {
                                        delegate: view.itemSelector,
                                        trackMouse: true,
                                        renderTo: Ext.getBody(),
                                        target: view.el,
                                        dismissDelay: 0,
                                        listeners:
                                        {
                                            beforeshow: function updateTipBody(tip) {
                                                tip.update('<body><table width="350px" eight="250px"><tr style="color:#084B8A; font-weight: bold"><td width="30%">' + translations.loadNumeroOrden + '</td><td width="50%">' + record.data.Order + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%">' + translations.loadCarga + '</td><td width="50%">' + record.data.Posex + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%">' + translations.loadEstatus + '</td><td width="50%">' + record.data.StatusDesc + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%">' + translations.loadProducto + '</td><td  width="50%">' + record.data.MatNum + '</td><td width="20%">&nbsp;</td></tr></table><br /><table width="100%"><tr><td width="30%">' + translations.loadEntrega + '</td><td width="30%"><span style="font-style:italic">' + translations.loadDate + ': ' + '</span>' + record.data.ReqDate + '</td><td width="40%"><span style="font-style:italic">' + translations.loadTime + ': ' + '</span>' + record.data.ReqTime + '</td></tr><tr><td width="30%">' + translations.loadCarga + '</td><td width="30%"><span style="font-style:italic">' + translations.loadDate + ': ' + '</span>' + record.data.LoadDate + '</td><td width="40%"><span style="font-style:italic">' + translations.loadTime + ': ' + '</span>' + record.data.LoadTime + '</td></tr><tr><td width="30%">' + translations.loadRequerida + '</td><td width="30%"><span style="font-style:italic">' + translations.loadDate + ': ' + '</span> ' + record.data.ReqDate + '</td><td width="40%"><span style="font-style:italic">' + translations.loadTime + ': ' + '</span> ' + record.data.ReqTime + '</td></tr></table><br /><table width="100%"><tr><td width="30%">' + translations.loadPlanta + '</td><td width="50%">' + record.data.Plant + '</td><td width="20%"></td></tr><tr><td width="30%" style="vertical-align:text-top">' + translations.loadCliente + '</td><td width="50%">' + record.data.Customer + ' - ' + record.data.CustoDesc + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%" style="vertical-align:text-top">' + translations.loadObra + '</td><td width="50%">' + record.data.Jobsite + ' - ' + record.data.JobstDesc + '</td><td width="20%">&nbsp;</td></tr></table></body>');
                                            }
                                        }
                                    }
                                    );
                                }
                            }

                        },
                        {
                            xtype: 'gridpanel',
                            id: 'gridLoadPerHour3',
                            title: "10:00 hrs to 11:00 hrs",
                            width: '33%',
                            height: 223,
                            enableColumnHide: false,
                            //store: 'Load3',
                            margins: { top: 0, left: 0, right: 0, bottom: 0 },
                            padding: { top: 0, left: 0, right: 0, bottom: 0 },
                            columns: [
                                { text: "Hr.", width: 40, dataIndex: 'LoadTime', sortable: false, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: translations.loadOrden, width: 100, dataIndex: 'Order', sortable: false, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: translations.loadProd, width: 73, dataIndex: 'MatDesc', sortable: false, autoSizeColumn: false, maxWidth: 73, tdCls: 'some-row-class' },
                                { text: "Vol.", width: 40, dataIndex: 'Quantity', sortable: false, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: translations.loadObra, width: 120, dataIndex: 'JobstDesc', sortable: false, autoSizeColumn: true, maxWidth: 120, tdCls: 'some-row-class' },
                                { text: "T.T.", width: 40, dataIndex: 'TravelTime', sortable: false, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                //{text: "Col2", hidden:true, width: 100, dataIndex: 'Col2', sortable: true, autoSizeColumn: false, maxWidth: 65,
                                //	renderer: function (value, metaData, record) {
                                //                return '<img src="' + params.schPath + '/icons/' + value + '" />';
                                //            }
                                //}
                                { text: "SessionId", hidden: true, dataIndex: 'SessionId', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Item", hidden: true, width: 100, dataIndex: 'Item', sortable: true, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                { text: "SimuLoadflg", hidden: true, width: 100, dataIndex: 'SimuLoadflg', sortable: true, autoSizeColumn: false, maxWidth: 60 },
                                { text: "Posex", hidden: true, width: 100, dataIndex: 'Posex', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Status", hidden: true, width: 100, dataIndex: 'Status', sortable: true, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                { text: "MatNum", hidden: true, width: 100, dataIndex: 'MatNum', sortable: true, autoSizeColumn: false, maxWidth: 60 },
                                { text: "ReqDate", hidden: true, width: 100, dataIndex: 'ReqDate', sortable: true, autoSizeColumn: false, maxWidth: 65 },
                                { text: "ReqTime", hidden: true, width: 100, dataIndex: 'ReqTime', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Plant", hidden: true, width: 100, dataIndex: 'Plant', sortable: true, autoSizeColumn: false, maxWidth: 65, tdCls: 'some-row-class' },
                                { text: "Customer", hidden: true, width: 100, dataIndex: 'Customer', sortable: true, autoSizeColumn: false, maxWidth: 60, tdCls: 'some-row-class' },
                                { text: "CustoDesc", hidden: true, width: 100, dataIndex: 'CustoDesc', sortable: true, autoSizeColumn: false, maxWidth: 60 },
                                { text: "StatusDesc", hidden: true, width: 100, dataIndex: 'StatusDesc', sortable: true, autoSizeColumn: false, maxWidth: 65 },
                                { text: "Jobsite", hidden: true, width: 100, dataIndex: 'Jobsite', sortable: true, autoSizeColumn: false, maxWidth: 65 },
                                { text: "SimuLoadflg", hidden: true, width: 100, dataIndex: 'SimuLoadflg', sortable: true, autoSizeColumn: false, maxWidth: 65 }
                                //,
                                //{text: "Col1", hidden:true, width: 100, dataIndex: 'Col1', sortable: true, autoSizeColumn: false, maxWidth: 65},
                            ],
                            viewConfig: {
                                enableTextSelection: true,

                                getRowClass: function (record, index) {
                                    if (record.get('SimuLoadflg') == "") {
                                        return "blanco";
                                    }
                                    else {
                                        return "naranja";
                                    }

                                    //if (record.get('Quantity') > 6) {
                                    //  return "blanco";
                                    //}
                                    //else {
                                    //  return "rojo";
                                    //}
                                }
                            },

                            listeners:
                            {
                                itemmouseenter: function (view, record, item, index, e, options) {
                                    var remarks = record.get('remarks');
                                    var view = this.getView();
                                    view.tip = Ext.create('Ext.tip.ToolTip', {
                                        delegate: view.itemSelector,
                                        trackMouse: true,
                                        renderTo: Ext.getBody(),
                                        target: view.el,
                                        dismissDelay: 0,
                                        listeners:
                                        {
                                            beforeshow: function updateTipBody(tip) {
                                                tip.update('<body><table width="350px" eight="250px"><tr style="color:#084B8A; font-weight: bold"><td width="30%">' + translations.loadNumeroOrden + '</td><td width="50%">' + record.data.Order + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%">' + translations.loadCarga + '</td><td width="50%">' + record.data.Posex + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%">' + translations.loadEstatus + '</td><td width="50%">' + record.data.StatusDesc + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%">' + translations.loadProducto + '</td><td  width="50%">' + record.data.MatNum + '</td><td width="20%">&nbsp;</td></tr></table><br /><table width="100%"><tr><td width="30%">' + translations.loadEntrega + '</td><td width="30%"><span style="font-style:italic">' + translations.loadDate + ': ' + '</span>' + record.data.ReqDate + '</td><td width="40%"><span style="font-style:italic">' + translations.loadTime + ': ' + '</span>' + record.data.ReqTime + '</td></tr><tr><td width="30%">' + translations.loadCarga + '</td><td width="30%"><span style="font-style:italic">' + translations.loadDate + ': ' + '</span>' + record.data.LoadDate + '</td><td width="40%"><span style="font-style:italic">' + translations.loadTime + ': ' + '</span>' + record.data.LoadTime + '</td></tr><tr><td width="30%">' + translations.loadRequerida + '</td><td width="30%"><span style="font-style:italic">' + translations.loadDate + ': ' + '</span> ' + record.data.ReqDate + '</td><td width="40%"><span style="font-style:italic">' + translations.loadTime + ': ' + '</span> ' + record.data.ReqTime + '</td></tr></table><br /><table width="100%"><tr><td width="30%">' + translations.loadPlanta + '</td><td width="50%">' + record.data.Plant + '</td><td width="20%"></td></tr><tr><td width="30%" style="vertical-align:text-top">' + translations.loadCliente + '</td><td width="50%">' + record.data.Customer + ' - ' + record.data.CustoDesc + '</td><td width="20%">&nbsp;</td></tr><tr><td width="30%" style="vertical-align:text-top">' + translations.loadObra + '</td><td width="50%">' + record.data.Jobsite + ' - ' + record.data.JobstDesc + '</td><td width="20%">&nbsp;</td></tr></table></body>');
                                            }
                                        }
                                    }
                                    );
                                }
                            }

                        }
                    ]
                }
            ]
        }
    ]
});




