Ext.define('Test43.view.Mep', {
    requires: ['Ext.form.field.ComboBox'],
    id: 'pnlMepCTP',
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

					    closeLoadsPerHourPanel();

					    Test43.app.getController('Main').getLoadPerHour('00');
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
                                    } else if (record.get('Color') == "#30A0D0") {
                                        return "azul";
                                    } else if (record.get('Color') == "#FFB000") {
                                        return "naranja";
                                    } else if (record.get('Color') == "#FFFF40") {
                                        return "amarillo";
                                    } else if (record.get('Color') == "#FF4040") {
                                        return "rojo";
                                    } else if (record.get('Color') == "#E0E0E0") {
                                        return "gris";
                                    } else {
					return "blanco";
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
                            flex: 3,
                            border: false,
                            items: [
                                {
                                    xtype: 'label',
                                    text: translations.mepFechaEntrega,
                                    layout: {
                                        type: 'center'
                                    },
                                    padding: { top: 0, left: 35, bottom: 10, right: 0 },
                                    flex: 3,
                                    align: "center"
                                },

                                {
                                    xtype: 'label',
                                    text: translations.mepHora,
                                    flex: 3,
                                    padding: { top: 0, left: 57, bottom: 0, right: 50 },
                                    align: "center"
                                },

{
                                    xtype: 'label',
                                    text: translations.mepFrecuencia,
                                    flex: 3,
                                    padding: { top: 0, left: 48, bottom: 0, right: 50 },
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
                                    width: 20,
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
				    width: 55,
                                    padding: { left: 5, right: 5 },
                                    flex: 4
                                },
                                {
                                    xtype: 'button',
                                    text: '+',
                                    id: 'btnMasMes',
                                    width: 20,
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
                                    width: 20,
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
    				    width: 25
                                },
                                {
                                    xtype: 'button',
                                    text: '+',
                                    id: 'btnMasHora',
                                    width: 20,
                                    margin: { left: 5, right: 5, top: 0, bottom: 0 },
                                    scale: 'small',
                                    tabIndex: -1,
                                    handler: function () {
                                        var newTime;

                                        newTime = addMinutes(Ext.getCmp("txtHour").value, 5);
                                        Ext.getCmp("txtHour").setValue(newTime);
                                    }
                                },
				{
                	            xtype: 'textfield',
				    id: 'txtFrecuencia',
 				    padding: { left: 0, right: 5 },
        	                    width: 25
	                        },
                                {
                                    xtype: 'button',
                                    text: 'Ok',
                                    id: 'btnCalcular',
                                    width: 30,
                                    scale: 'small',
                                    margin: { left: 0, right: 5, top: 0, bottom: 0 },
                                    handler: function () {
                                        var txtFrom = Ext.getCmp("txtFrom");
                                        var txtHour = Ext.getCmp("txtHour");
                                        var txtFrecuencia = Ext.getCmp("txtFrecuencia");

                                        var controller = Test43.app.getController('Main');
					
					//TODO FREC
                                        try {
                                            if (txtFrom && txtHour && txtFrecuencia && txtFrom.value && txtHour.value && txtFrecuencia.value) {
                                                controller.changeDateTime(txtFrom.value, txtHour.value, txtFrecuencia.value);
                                            }
                                            else if (txtFrom && txtHour && txtFrecuencia && txtFrom.value && txtHour.getRawValue() && txtFrecuencia.value) {
                                                controller.changeDateTime(txtFrom.value, getTimeFromRaw(txtHour.getRawValue()), txtFrecuencia.value);
                                            }
						
					    closeLoadsPerHourPanel();

                                        }
                                        catch (e) {

                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'SF',
                                    id: 'btnGenerarSerie',
                                    width: 40,
                                    scale: 'small',
                                    margin: { left: 0, right: 5, top: 0, bottom: 0 },
                                    handler: function () {
                                       
//******************************

var myForm = new Ext.form.Panel({
    width: 500,
    height: 400,
    title: 'Foo',
    floating: true,
    closable : true
});
myForm.show();



//*****************************
					
                                    }
                                }
			    ]
                        },
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


   var storeLoad1 = Ext.getCmp('toreLoadsPerHour1');
   if (storeLoad1) {

	//Clean Store
	storeLoadsPerHour1.loadData([],false);
        storeLoadsPerHour2.loadData([],false);
        storeLoadsPerHour3.loadData([],false);

	objgrid1.store.removeAll(true);
        objgrid2.store.removeAll(true);
        objgrid3.store.removeAll(true);
   }
}
