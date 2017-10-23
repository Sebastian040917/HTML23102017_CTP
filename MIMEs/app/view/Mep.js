Ext.define('Test43.view.Mep', {
    requires: ['Ext.form.field.ComboBox'],
    extend: 'Ext.panel.Panel',
    alias: 'widget.mep',
    defaultType: 'textfield',
    title: translations.MepTitle,
    width: '35%',
    height: '100%',
    align: 'center',
    margins: { top: 5, left: 5, right: 5, bottom: 5 },
    items: [
        {
            xtype: 'form',
            layout:
                {
                    type: 'fit',
                    align: 'center',
                    pack: 'center'
                },
            height: '100%',
            minHeight: 305,
            border: false,
            padding: { top: 20, left: 5, right: 5, bottom: 5 },
            items: [
                {
                    layout: 'anchor',
                    border: false,
                    items: [
                        {
                            layout: 'hbox',
                            border: false,
                            flex: 2,
                            items: [
                                {
                                    xtype: 'label',
                                    text: translations.mepPlant,
                                    aling: 'center',
                                    flex: 1,
                                    padding: { left: 5 }
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'cmbPlants',
                                    store: 'PlantStore',
                                    displayField: 'Name',
                                    valueField: 'Id',
                                    aling: 'middle',
                                    flex: 4,
                                    validateOnChange: true,
                                    queryMode: 'local',
                                    typeAhead: true,
                                    minChars: 2,
                                    tabIndex: '1',
                                    disabled: true,
                                    padding: { left: 5, right: 5 }
                                },
                                {
                                    xtype: 'button',
                                    text: translations.mepAgregar,
                                    tabIndex: '2',
                                    id: 'btnAddPlant',
                                    disabled: true,
                                    handler: function () {
                                        if (Ext.getCmp('cmbPlants').getValue()) {
                                            Test43.app.getController('Main').addPlant(Ext.getCmp('cmbPlants').getValue());
                                        }
                                        else {
                                            Ext.MessageBox.alert('Error', translations.mepSelPlanta, "");
                                        }
                                    },
                                    scale: 'small',
                                    align: 'center',
                                    flex: 2,
                                    margin: { left: 5, right: 5, top: 0, bottom: 0 }
                                },
                                {
                                    xtype: 'button',
                                    text: translations.mepMasPlantas,
                                    id: 'btnMorePlants',
                                    disabled: true,
                                    tabIndex: '3',
                                    handler: function () {
                                        Test43.app.getController('Main').masPlantas();
                                    },
                                    scale: 'small',
                                    aling: 'center',
                                    flex: 2,
                                    margin: { left: 5, right: 5, top: 0, bottom: 0 }
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            html: '&nbsp;',
                            flex: 1
                        },
                        {
                            xtype: 'gridpanel',
                            layout: {
                                type: 'fit'
                            },
                            id: 'grdUserPlants',
                            store: 'UserPlantStore',
                            padding: { left: 5, right: 5 },
                            autoScroll: true,
                            maxHeight: 140,
                            tabIndex: '4',
                            flex: 8,
                            columns: [
                                {
                                    xtype: 'checkcolumn', text: '', width: '6%', dataIndex: 'isselected', sortable: false, singleSelect: true,
                                    listeners: {
                                        checkchange: function (g, rowIndex, e) {
                                            var aux;
                                            var pstore;
                                            var notReload;

                                            aux = [];

                                            pstore = Ext.getStore('UserPlantStore');

                                            for (var i = 0; i < pstore.data.items.length; i++) {

                                                aux.push(pstore.data.items[i].data);
                                                aux[i].isselected = (i == rowIndex);

                                                if (i == rowIndex) {
                                                    Test43.app.getController('Main').selectPlant(aux[i].plant);
                                                    Test43.app.getController('Main').getGrafica(aux[i]);
                                                }
                                            }

                                            pstore.loadData(aux);
                                        }
                                    }
                                },
                                { text: translations.mepCentro, dataIndex: 'plant', width: '11%', sortable: false },
                                { text: translations.mepNombre, dataIndex: 'plant_name', sortable: false, width: '35%' },
                                { text: translations.mepDuracion, dataIndex: 'travel_time', width: '19%', sortable: false, align: "center" },
                                { text: translations.mepDistancia, dataIndex: 'distance', width: '18%', sortable: false, align: "center" },
                                { text: translations.mepCosto, dataIndex: 'cost', width: '0%', sortable: false, align: "center", hidden: true },
                                {
                                    text: translations.mepCTP, dataIndex: 'ctp_icon', width: '10%', sortable: false, align: "center",
                                    renderer: function (value, metaData, record) {

                                        return '<img src="' + params.schPath + '/icons/' + value + '" />';
                                    }
                                }
                            ],
                            viewConfig: {
                                getRowClass: function (record, index) {
                                    if (record.get('Color') == "#FFFFFF") {
                                        return "blanco";
                                    }
                                    else {
                                        return "rojo";
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'label',
                            html: '&nbsp;',
                            flex: 1
                        },
                        {
                            layout: 'hbox',
                            flex: 2,
                            border: false,
                            items: [
                                {
                                    xtype: 'label',
                                    text: translations.mepFechaEntrega,
                                    layout: {
                                        type: 'center'
                                    },
                                    padding: { left: 35, right: 5 },
                                    flex: 2,
                                    align: "center"
                                },

                                {
                                    xtype: 'label',
                                    text: translations.mepHora,
                                    flex: 2,
                                    padding: { left: 10, right: 5 },
                                    align: "center"
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            flex: 2,
                            border: false,
                            items: [
                                {
                                    xtype: 'button',
                                    text: '-',
                                    id: 'btnMenosMes',
                                    width: 25,
                                    margin: { top: 0, right: 0, bottom: 0, left: 5 },
                                    scale: 'small',
                                    tabIndex: -1,
                                    handler: function () {
                                        Ext.getCmp('txtFrom').setValue(Ext.Date.add(Ext.getCmp('txtFrom').value,
                                            Ext.Date.DAY,
                                            -1));
                                        Ext.getCmp('btnCalcular').setDisabled(false);
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: 'txtFrom',
                                    format: 'd.m.Y',
				    width: '10%',
                                    padding: { left: 5, right: 5 },
                                    flex: 4
                                },
                                {
                                    xtype: 'button',
                                    text: '+',
                                    id: 'btnMasMes',
                                    width: 25,
                                    //padding: { left: 5, right: 5 },
                                    scale: 'small',
                                    tabIndex: -1,
                                    handler: function () {
                                        Ext.getCmp('txtFrom').setValue(Ext.Date.add(Ext.getCmp('txtFrom').value,
                                            Ext.Date.DAY,
                                            1));
                                        Ext.getCmp('btnCalcular').setDisabled(false);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: '-',
                                    id: 'btnMenosHora',
                                    width: 25,
                                    margin: { right: 5, left: 5, top: 0, bottom: 0 },
                                    scale: 'small',
                                    tabIndex: -1,
                                    handler: function () {
                                        var newTime;

                                        newTime = addMinutes(Ext.getCmp("txtHour").value, -5);
                                        Ext.getCmp("txtHour").setValue(newTime);
                                    }
                                },
                                {
                                    xtype: 'timefield',
                                    id: 'txtHour',
                                    format: 'H:i',
                                    increment: 5,
                                    flex: 4,
    				    width: '5%'
                                },
                                {
                                    xtype: 'button',
                                    text: '+',
                                    id: 'btnMasHora',
                                    width: 25,
                                    margin: { left: 5, right: 5, top: 0, bottom: 0 },
                                    scale: 'small',
                                    tabIndex: -1,
                                    handler: function () {
                                        var newTime;

                                        newTime = addMinutes(Ext.getCmp("txtHour").value, 5);
                                        Ext.getCmp("txtHour").setValue(newTime);
                                    }
                                },
				//{
                	        //    xtype: 'textfield',
				//    id: 'txtFrecuencia',
 				//    padding: { left: 0, right: 5 },
        	                //    width: '10%'
	                        //},
                                {
                                    xtype: 'button',
                                    text: 'Ok',
                                    id: 'btnCalcular',
                                    width: 40,
                                    scale: 'small',
                                    margin: { left: 0, right: 5, top: 0, bottom: 0 },
                                    handler: function () {
                                        var txtFrom = Ext.getCmp("txtFrom");
                                        var txtHour = Ext.getCmp("txtHour");
                                        var controller = Test43.app.getController('Main');
					
                                        try {
                                            if (txtFrom && txtHour && txtFrom.value && txtHour.value) {
                                                controller.changeDateTime(txtFrom.value, txtHour.value);
                                            }
                                            else if (txtFrom && txtHour && txtFrom.value && txtHour.getRawValue()) {
                                                controller.changeDateTime(txtFrom.value, getTimeFromRaw(txtHour.getRawValue()));
                                            }
						
					    closeLoadsPerHourPanel();

                                        }
                                        catch (e) {

                                        }
                                    }
                                }
			    ]
                        }
                    ]
                }
            ]
        }
    ]
});

function getTimeFromRaw(time) {
    var aux;
    var currTime;
    var hour;
    var minute;

    if (!time)
    {
        return new Date();
    }

    try {
        if (time.indexOf(":")) {
            hour = parseInt(time.split(":")[0]);
            minute = parseInt(time.split(":")[1]);
        }
        else {
            hour = parseInt(time);
        }
    }
    catch (e) {

    }

    if (!hour) {
        hour = 0;
    }

    if (!minute) {
        minute = 0;
    }

    currTime = new Date();

    aux = new Date(currTime.getYear(), currTime.getMonth(), currTime.getDate(), hour, minute);

    return aux;
}

function closeLoadsPerHourPanel() {
   var objLoads = Ext.getCmp('hboxLoads');
   var objPump = Ext.getCmp('panelPump');
   var objbuttonClose = Ext.getCmp('hboxbuttonClose');

   if(objLoads){objLoads.setVisible(false);}
   else{objLoads.setVisible(true);}
  
   if(objPump){objPump.setVisible(true);}
   else{objPump.setVisible(false);}

   var objgrid1 = Ext.getCmp('gridLoadPerHour1');
   var objgrid2 = Ext.getCmp('gridLoadPerHour2');
   var objgrid3 = Ext.getCmp('gridLoadPerHour3');


	//Clean Store
	storeLoadsPerHour1.loadData([],false);
        storeLoadsPerHour2.loadData([],false);
        storeLoadsPerHour3.loadData([],false);

	objgrid1.store.removeAll(true);
        objgrid2.store.removeAll(true);
        objgrid3.store.removeAll(true);
}

