Ext.define('Test43.view.DispatchTree', {
    requires: ['Sch.panel.SchedulerGrid',
        'Sch.plugin.Zones'
    ],
    extend: 'Ext.container.Container',
    alias: 'widget.dispatchtree',
    border: false,
    items: [{
        xtype: 'schedulergrid',
        id: 'schPumpService',
        flex: 1,
        startDate: new Date(),
        endDate: new Date(),
        resourceStore: 'ResourceStore',
        eventStore: 'ItemsStore',
        useArrows: true,
        rootVisible: true,
        viewPreset: 'hourAndDay',
        multiSelect: false,
        minZoomLevel: 17,
        maxZoomLevel: 23,
        constrainDragToResource: false,
        enableEventDragDrop: true,
        enableDragCreation: false,
        readOnly: false,
        eventResizeHandles: 'none',
        eventBorderWidth: 4,
        maxHeight: 180,
        autoScroll: true,
        showHeaderElements : true,
        //innerHeaderTpl: '<span class="taskTip" title="{FormattedDate} {PlantId}">　</span>',
        tooltipTpl: new Ext.Template('<body><table width="350px" eight="250px"><tr style="color:#084B8A; font-weight: bold"><td width="30%">' + 'Pump Order and Item Service' + '</td><td width="50%"> {iPlant}' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Pump Vehicle' + '</td><td width="50%">' + '18' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Volume to be Pump' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Pump Type Description' + '</td><td width="50%">' + 'BOOM PUMP 15M' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Pump Reach' + '</td><td width="50%">' + 'BOOM PUMP 45M-' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Pump Item and Status Description' + '</td><td width="50%">' + 'NOST-Not Started-Itm' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Start Time' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'End Time' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Delivery Time' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Job Site' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Job Site Address' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'POD Address' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Purchaser' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Additional Charges' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Plant' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr><tr style="color:#084B8A; "><td width="30%">' + 'Pump Information' + '</td><td width="50%">' + '123456' + '</td><td width="20%">&nbsp;</td></tr></table></body>'),
        tipCfg:       {         dismissDelay: 0       },
        dragging: true,
        dndValidatorFn: function(dragRecords, targetResourceRecord, date, e) {
            return true;
        },
        headerConfig: {
            middle: {
                unit: "HOUR",
                align: 'left',
                renderer: function(start, end, cfg, index) {
                    if (index === 0) {
                        // Same styling as normal grid column headers
                        return '<b style="position: absolute;top:8px">Timeline</b>'
                    }

                    cfg.headerCls += 'ticks-header';
                    return Ext.String.format('<div class="ticks-outer">&nbsp;<div class="ticks-inner">&nbsp;</div></div>{0} s', index);
                }
            },
            top: {
                unit: "DAY",
                increment: 1,
                dateFormat: 'd M Y',
                renderer: function(start, end, cfg, index) {
                    if (index === 0) {
                        // Same styling as normal grid column headers
                        return '<b style="position: absolute;top:8px">Timeline</b>'
                    }

                    cfg.headerCls += 'ticks-header';
                    return Ext.String.format('<div class="ticks-outer">&nbsp;<div class="ticks-inner">&nbsp;</div></div>{0} s', index);
                }
            }
        },
        snapToIncrement: true,
        allowOverlap: false,
        viewConfig: {
            loadMask: true,
            stripeRows: true,
            forceFit: true
        },
        columns: [{
                id: 'PlantId',
                header: translations.mepPlant,
                width: 130,
                dataIndex: 'iPlant',
                items: [{
                    xtype: 'textfield',
                    text: 'Filtro',
                    listeners: {
                        change: function(field, newValue, oldValue) {
                            window.filterPlant = newValue;
                            if (newValue) {
                                var regexps = Ext.Array.map(newValue.split(/\s+/), function(token) {
                                    return new RegExp(Ext.String.escapeRegex(token), 'i');
                                });
                                var length = regexps.length;
                                var resourceStore = Ext.getStore("ResourceStore");

                                resourceStore.filterBy(function(rec, id) {
                                    if ((rec.raw['Name'].indexOf(window.filterName) >= 0 && rec.raw['iPlant'].indexOf(window.filterPlant) >= 0) || rec.raw['iPlant'] == '') {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });



                            } else {
                                var resourceStore = Ext.getStore("ResourceStore");
                                resourceStore.clearFilter();
                                resourceStore.filterBy(function(rec, id) {
                                    if ((rec.raw['Name'].indexOf(window.filterName) >= 0) || rec.raw['iPlant'] == '') {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                            }
                        },

                        specialkey: function(field, e, t) {
                            if (e.keyCode === e.ESC) field.reset();
                        }
                    }
                }],
                renderer: function(start, end, cfg, index) {

                    // Same styling as normal grid column headers
                    return cfg.raw.iPlant;


                    //cfg.headerCls += 'ticks-header';
                    //return Ext.String.format('<div class="ticks-outer">&nbsp;<div class="ticks-inner">&nbsp;</div></div>{0} s', index);
                }
            }, {
                header: translations.schCamiones,
                width: 130,
                dataIndex: 'Name',
                items: [{
                    xtype: 'textfield',
                    text: 'Filtro',
                    listeners: {
                        change: function(field, newValue, oldValue) {
                            window.filterName = newValue;
                            if (newValue) {
                                var regexps = Ext.Array.map(newValue.split(/\s+/), function(token) {
                                    return new RegExp(Ext.String.escapeRegex(token), 'i');
                                });
                                var length = regexps.length;
                                var resourceStore = Ext.getStore("ResourceStore");

                                resourceStore.filterBy(function(rec, id) {
                                    if ((rec.raw['Name'].indexOf(window.filterName) >= 0 && rec.raw['iPlant'].indexOf(window.filterPlant) >= 0) || rec.raw['iPlant'] == '') {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });



                            } else {
                                var resourceStore = Ext.getStore("ResourceStore");
                                resourceStore.clearFilter();


                                resourceStore.filterBy(function(rec, id) {
                                    if ((rec.raw['iPlant'].indexOf(window.filterPlant) >= 0) || rec.raw['iPlant'] == '') {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                            }
                        },

                        specialkey: function(field, e, t) {
                            if (e.keyCode === e.ESC) field.reset();
                        }
                    }

                }]
            },


            {
                xtype: 'actioncolumn',
                width: 20,
                items: [{
                    icon: params.schPath + '/icons/' + 'map.png',
                    tooltip: 'Route',
                    handler: function(grid, rowIndex, colIndex, item, resource, tplData) {
                        var Id = tplData.raw.Id;
                        var iPlant = tplData.raw.iPlant;
                        var Name = tplData.raw.Name;
                        var Status = tplData.raw.Status;
                        onShowRoute(iPlant);
                    }
                }]
            }


        ],
        eventRenderer: function(item, resource, tplData) {
            if (item.data.ResourceId == 1) {
                tplData.style = "background-color: #CCCCCC;";
                tplData.cls = 'evt-' + 'Asignable';
            } else if (item.data.Group == "Servicio") {
                tplData.style = "background-color: #FFCC44;";
                tplData.cls = 'evt-' + 'Asignable';
            } else {
                tplData.style = "background-color: " + item.data.Color + ";";
            }
        },
        plugins: [{
            ptype: "scheduler_zones",
            showHeaderElements: false,
            // If you want, show some extra meta data for each zone
            innerTpl: '<span class="zone-type">{Type}</span>',
            store: 'ZoneStore'
        }],
        schedulerConfig: {
            scroll: true,
            columnLines: false
        },
        // Specialized body template with header and footer
        eventBodyTemplate: new Ext.Template(
            '<div class="sch-event-header">{headerText}</div>' +
            '<div class="sch-event-footer">{footerText}</div>'
        ),
        listeners: {
            beforetooltipshow: function(scheduler, eventRecord, eOpts) {
                var a = eventRecord.raw.ResourceId;

                if (eventRecord.raw.Order == undefined) {
                    //var tpl = scheduler.tooltipTpl;
                    //tpl.destroy;
                    scheduler.tooltipTpl.set('<div>Pump Undefined</div>', true);
                } else {
                    //scheduler.tooltipTpl.set('<body><table width="350px" eight="250px"><tr style="color:#084B8A; font-weight: bold"><td width="50%">' + translations.mepPumpOrder + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpVehicle + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpVolumen + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpType + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpReach + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpItemStatus + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpStartTime + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpEndTime + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpDeliveryTime + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpJobSite + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpJobSiteAddress + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpPODAddress + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpPurchaser + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpAdditionalCharges + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpPlant + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr><tr style="color:#084B8A; "><td width="50%">' + translations.mepPumpImformation + '</td><td width="50%">' + eventRecord.raw.ResourceId + '</td></tr></table></body>', true);

                    scheduler.tooltipTpl.set('<body><table width="350px" eight="250px"><tr style="color:#084B8A; font-weight: bold"><td width="50%">' + translations.mepPumpOrder + '</td><td width="50%">' + eventRecord.raw.Order + '</td></tr><tr><td width="50%">' + translations.mepPumpService + '</td><td width="50%">' + eventRecord.raw.ServDesc + '</td></tr><tr><td width="50%">' + translations.mepPumpVolumen + '</td><td width="50%">' + eventRecord.raw.Quantity + '</td></tr><tr><td width="50%">' + translations.mepPumpDescription + '</td><td width="50%">' + eventRecord.raw.PumpDesc + '</td></tr><tr><td width="50%">' + translations.mepPumpType + '</td><td width="50%">' + eventRecord.raw.PumpType + '</td></tr><tr><td width="50%">' + translations.mepPumpRange + '</td><td width="50%">' + eventRecord.raw.PumpMax + '</td></tr><tr><td width="50%">' + translations.mepPumpStatusItem + '</td><td width="50%">' + eventRecord.raw.StatusTx + '</td></tr><tr><td width="50%">' + translations.mepPumpStartDateTime + '</td><td width="50%">' + eventRecord.raw.StartPdate + ' ' + eventRecord.raw.StartPtime + '</td></tr><tr><td width="50%">' + translations.mepPumpEndServiceDateTime + '</td><td width="50%">' + eventRecord.raw.EndPdate + ' ' + eventRecord.raw.EndPtime + '</td></tr><tr><td width="50%">' + translations.mepPumpEndDeliveryDateTime + '</td><td width="50%">' + eventRecord.raw.DelivDate + ' ' + eventRecord.raw.DelivTime + '</td></tr><tr><td width="50%">' + translations.mepPumpJobSiteNumber + '</td><td width="50%">' + eventRecord.raw.Jobsite + '/' + eventRecord.raw.JobstDesc + '</td></tr><tr><td width="50%">' + translations.mepPumpPODNumberDesc + '</td><td width="50%">' + eventRecord.raw.Pod + '/' + eventRecord.raw.PodDesc + '</td></tr><tr><td width="50%">' + translations.mepPumpPODAddress + '</td><td width="50%">' + eventRecord.raw.PodAddr + '</td></tr><tr><td width="50%">' + translations.mepPumpOrderContact + '</td><td width="50%">' + eventRecord.raw.Customer + '/' + eventRecord.raw.CustoDesc + '</td></tr></table></body>', true);
                }

            },

            beforeeventdrag: function(s, r) {
                return r.get('Group') == 'Servicio';
            },
            beforeeventdropfinalize: function(s, dragContext) {

                if (dragContext.newResource.data.Id == 2) {
                    dragContext.finalize(false);
                }

                var zone = Ext.getStore("ZoneStore").data.items[0];

                if (dragContext.resourceRecord !== dragContext.newResource) {

                    var event = Test43.app.getController('Main').pumpService;
                    var controller = Test43.app.getController('Main');

                    zone.setStartDate(dragContext.startDate);
                    zone.setEndDate(dragContext.endDate);

                    event.data.StartDate = dragContext.startDate;
                    event.data.EndDate = dragContext.endDate;
                    event.setResourceId(dragContext.newResource.data.Id);

                    controller.setPump(dragContext.newResource.data.Id);

                    dragContext.finalize(true);
                    return false;
                } else {
                    var event = Test43.app.getController('Main').pumpService;
                    var controller = Test43.app.getController('Main');

                    if (event.data.StartDate == dragContext.startDate) {
                        return false;
                    }

                    zone.setStartDate(dragContext.startDate);
                    zone.setEndDate(dragContext.endDate);

                    event.data.StartDate = dragContext.startDate;
                    event.data.EndDate = dragContext.endDate;

                    controller.setPump(dragContext.newResource.data.Id);

                    dragContext.finalize(true);
                    return false;
                }
            },
            itemdblClick: function(g, rec, e, eOpts) {
                var event = Test43.app.getController('Main').pumpService;
                var controller = Test43.app.getController('Main');

                if (rec.data.Id == 2) {
                    return;
                }

                if (event.data.ResourceId == rec.data.Id) {
                    event.setResourceId(001);
                    controller.setPump(001);
                } else {
                    event.setResourceId(rec.data.Id);
                    controller.setPump(rec.data.Id);
                }

                Ext.getCmp("schPumpService").getSchedulingView().scrollEventIntoView(event, true);
            }
        }
    }]
});


function onDropConfirm(btn) {
    me.__ddContext.finalize(btn === 'yes');
}

var map = null;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer({

    markerOptions: { icon: "http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=truck|2e4b64" }

});

var locationsArr = [{
        pump: "AAAA",
        origin: { lat: 25.683421, lng: -100.308871 },
        destination: { lat: 25.683421, lng: -100.308871 },
        route: [
            { lat: 25.649654, lng: -100.727157 },
            { lat: 25.541305, lng: -100.945926 },
            { lat: 25.429964, lng: -100.994776 },

        ]
    },
    {
        pump: "BBBB",
        origin: { lat: 25.649654, lng: -100.727157 },
        destination: { lat: 25.649654, lng: -100.727157 },
        route: [
            { lat: 25.269833, lng: -100.577096 }
        ]
    },
    {
        pump: "CCCC",
        origin: { lat: 25.739687, lng: -100.243657 },
        destination: { lat: 25.739687, lng: -100.243657 },
        route: [
            { lat: 25.192946, lng: -99.831860 },
            { lat: 24.907664, lng: -99.683059 },
            { lat: 24.502716, lng: -99.498266 },
            { lat: 23.759113, lng: -99.136126 },
        ]
    },
    {
        pump: "DDDD",
        origin: { lat: 22.175379, lng: -100.983862 },
        destination: { lat: 22.175379, lng: -100.983862 },
        route: [
            { lat: 22.453293, lng: -100.300735 },
            { lat: 21.939837, lng: -99.983961 },
            { lat: 22.016987, lng: -99.670755 },
            { lat: 22.057813, lng: -99.078598 },
        ]
    }

];



function onShowRoute(pumpSelected) {

    //locationsArr = Test43.app.getController('Main').loadMapData();

    var _childreen = [];
    for (var k = 0; k < locationsArr.length; k++) {
        var child = { text: locationsArr[k].pump, leaf: true }
        _childreen.push(child);
    }

    var data = {
        children: _childreen

    }

    Ext.create('Ext.data.TreeStore', {
        storeId: 'storeTree',
        root: data
    });

    var myForm = new Ext.form.Panel({
        height: 546,
        width: 1184,
        title: translations.routes,
        closeAction: 'destroy',
        floating: true,
        closable: true,
        items: [
            Ext.create('Ext.panel.Panel', {
                height: 546,
                width: 1184,
                layout: 'border',
                items: [{
                        region: 'west',
                        xtype: 'panel',
                        width: 100,
                        collapsible: false,
                        id: 'west-region-container',
                        layout: 'fit',
                        items: [{
                            xtype: 'tree',
                            store: "storeTree",
                            rootVisible: false,
                            listeners: {
                                itemclick: function(s, r) {
                                    getPumpMatkers(r.data.text);

                                }
                            },
                            tbar: [{
                                text: translations.showAll,
                                scope: this,
                                width: '100%',
                                handler: showAllRoutes
                            }]

                        }]
                    },
                    {
                        region: 'center',
                        xtype: 'panel',
                        layout: 'fit',
                        items: {
                            xtype: 'gmappanel',
                            gmapType: 'map',
                            center: { lat: 25.704887, lng: -100.297320 },
                            zoom: 18,
                            mapOptions: {
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            }
                        }
                    }
                ]
            })

        ]
    });


    setTimeout(getPumpMatkers, 250, pumpSelected);
    myForm.show();
    map = myForm.down('gmappanel');

}


function getPumpMatkers(pump) {
    //pump = 'AAAA';
    calculateAndDisplayRoute(directionsService, directionsDisplay, pump);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, pumpSelected) {

    var waypts = [];
    var origin = { lat: 0, lng: 0 };
    var destination = { lat: 0, lng: 0 };


    for (var i = 0; i < locationsArr.length; i++) {
        if (locationsArr[i].pump == pumpSelected) {
            if (origin.lat === 0) {

                origin = locationsArr[i].origin;
                destination = locationsArr[i].destination;
            }

            for (var k = 0; k < locationsArr[i].route.length; k++) {
                var wypnts = locationsArr[i].route[k];

                if (wypnts != undefined) {
                    waypts.push({
                        location: { lat: wypnts.lat, lng: wypnts.lng },
                        stopover: true
                    });
                }


            }

        }
    }

    directionsService.route({
        origin: new google.maps.LatLng(origin),
        destination: new google.maps.LatLng(destination),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            //directionsDisplay.setDirections(null);
            directionsDisplay.setDirections(response);
            // var route = response.routes[0];
            //var summaryPanel = document.getElementById('directions-panel');
            //summaryPanel.innerHTML = '';
            // For each route, display summary information.
            // for (var i = 0; i < route.legs.length; i++) {

            //console.log(route.legs[i].start_address);
            //console.log(route.legs[i].end_address);
            // console.log(route.legs[i].distance.text);

            //var routeSegment = i + 1;
            //summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            //    '</b><br>';
            //  summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
            // summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
            // summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            // }



        } else {
            Ext.Msg.alert('Directions request failed due to ' + status);
        }
    });

    clearMarks();
    directionsDisplay.setMap(map.gmap);
}

function clearMarks() {

    for (var k = 0; k < 10; k++) {

        if (typeof window["directionsDisplay" + k] !== 'undefined') {
            window["directionsDisplay" + k].setMap(null);
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function showAllRoutes() {
    directionsDisplay.setMap(null);

    var counter = 0;
    for (var l = 0; l < locationsArr.length; l++) {

        var loc = locationsArr[l];
        window['waypts' + l] = [];

        for (var k = 0; k < loc.route.length; k++) {
            window['waypts' + l].push({
                location: { lat: loc.route[k].lat, lng: loc.route[k].lng },
                stopover: false
            });
        }

        window['request' + l] = {
            origin: loc.origin,
            destination: loc.destination,
            waypoints: window['waypts' + l],
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
            optimizeWaypoints: true,
        };

        setTimeout(GetPositions(counter, window['request' + l]), 40000);
        counter = counter + 1;
    }

} //end show all routes

function GetPositions(position, request) {

    window['directionsService' + position] = new google.maps.DirectionsService();

    window['directionsService' + position].route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            var colorrandom = getRandomColor();
            var colorRandomnohash = colorrandom.substr(1, colorrandom.length);

            window['directionsDisplay' + position] = new google.maps.DirectionsRenderer({
                markerOptions: {
                    icon: "http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=truck|" + colorRandomnohash
                },
                polylineOptions: { strokeColor: colorrandom }
            });

            window['directionsDisplay' + position].setMap(map.gmap);
            window['directionsDisplay' + position].setDirections(response);

        }
    });

}