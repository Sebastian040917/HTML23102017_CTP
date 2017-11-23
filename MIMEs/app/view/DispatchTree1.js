window.filterPlant="";
window.filterName="";
Ext.define('Test43.view.DispatchTree', {
    requires: ['Sch.panel.SchedulerGrid',
    'Sch.plugin.Zones'],
    extend: 'Ext.container.Container',
    alias: 'widget.dispatchtree',
    border: false,
    items: [
        {
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
            dragging: true,
            dndValidatorFn: function (dragRecords, targetResourceRecord, date, e) {
                return true;
            },
            headerConfig: {
                middle: {
                    unit: "HOUR",
                    align: 'left',
                    renderer: function (start, end, cfg, index) {
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
                    renderer: function (start, end, cfg, index) {
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
            columns: [
{ header: 'Planta', width: 130, dataIndex: 'iPlant',items: [
                        {
                            xtype: 'textfield',
                            text: 'Filtro',
							listeners : {
                    change : function (field, newValue, oldValue) {
						window.filterPlant=newValue;
                        if (newValue) {
                            var regexps = Ext.Array.map(newValue.split(/\s+/), function (token) {
                                return new RegExp(Ext.String.escapeRegex(token), 'i');
                            });
                            var length  = regexps.length;
							var resourceStore=Ext.getStore("ResourceStore");
							if(newValue==""){
								resourceStore.clearFilter();
							} else {
								resourceStore.filterBy(function(rec, id) {
								if((rec.raw['Name'].indexOf(window.filterName)>= 0 && rec.raw['iPlant'].indexOf(window.filterPlant)>0) || rec.raw['iPlant']=='') {
									return true;
								} else {
									return false;
								}
								});
							}
							  
                            
                        } else {
							var resourceStore=Ext.getStore("ResourceStore");
                            resourceStore.clearFilter();
                        }
                    },

                    specialkey : function (field, e, t) {
                        if (e.keyCode === e.ESC) field.reset();
                    }
                }
                        }
                    ],renderer: function (start, end, cfg, index) {
                       
                            // Same styling as normal grid column headers
                            return cfg.raw.iPlant;
                        

                        //cfg.headerCls += 'ticks-header';
                        //return Ext.String.format('<div class="ticks-outer">&nbsp;<div class="ticks-inner">&nbsp;</div></div>{0} s', index);
                    }} ,{header: translations.schCamiones, width: 130, dataIndex: 'Name',items: [
                        {
                            xtype: 'textfield',
                            text: 'Filtro',
			    listeners : {
                    change : function (field, newValue, oldValue) {
					window.filterName=newValue;
                        if (newValue) {
                            var regexps = Ext.Array.map(newValue.split(/\s+/), function (token) {
                                return new RegExp(Ext.String.escapeRegex(token), 'i');
                            });
                            var length  = regexps.length;
							var resourceStore=Ext.getStore("ResourceStore");
							if(newValue==""){
								resourceStore.clearFilter();
							} else {
								resourceStore.filterBy(function(rec, id) {
								if((rec.raw['Name'].indexOf(window.filterName)>= 0 && rec.raw['iPlant'].indexOf(window.filterPlant)>0) || rec.raw['iPlant']=='') {
									return true;
								} else {
									return false;
								}
								});
							}
							  
                            
                        } else {
							var resourceStore=Ext.getStore("ResourceStore");
                            resourceStore.clearFilter();
                        }
                    },

                    specialkey : function (field, e, t) {
                        if (e.keyCode === e.ESC) field.reset();
                    }
                }
                           
                        }
                    ]}
          ],
            eventRenderer: function (item, resource, tplData) {
			
                if (item.data.ResourceId == 1) {
                    tplData.style = "background-color: #CCCCCC;";
                    tplData.cls = 'evt-' + 'Asignable';
                } else if (item.data.Group == "Servicio") {
                    tplData.style = "background-color: #FFCC44;";
                    tplData.cls = 'evt-' + 'Asignable';
                }
                else {
                    tplData.style = "background-color: " + item.data.Color + ";";
                }
            },
            plugins: [
                {
                    ptype: "scheduler_zones",
                    showHeaderElements: false,
                    // If you want, show some extra meta data for each zone
                    innerTpl: '<span class="zone-type">{Type}</span>',
                    store: 'ZoneStore'
                }
            ],
            schedulerConfig: {
                scroll: true,
                columnLines: false
            },
            listeners: {
                beforeeventdrag: function (s, r) {
                    return r.get('Group') == 'Servicio';
                },
                beforeeventdropfinalize: function (s, dragContext) {

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
                    }
                    else {
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
                itemdblClick: function (g, rec, e, eOpts) {
                    var event = Test43.app.getController('Main').pumpService;
                    var controller = Test43.app.getController('Main');

                    if (rec.data.Id == 2) {
                        return;
                    }

                    if (event.data.ResourceId == rec.data.Id) {
                        event.setResourceId(001);
                        controller.setPump(001);
                    }
                    else {
                        event.setResourceId(rec.data.Id);
                        controller.setPump(rec.data.Id);
                    }

                    Ext.getCmp("schPumpService").getSchedulingView().scrollEventIntoView(event, true);
                }
            }
        }
    ]
});


function onDropConfirm(btn) {
    me.__ddContext.finalize(btn === 'yes');
}

