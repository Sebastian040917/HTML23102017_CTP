Ext.util.CSS.createStyleSheet(
    '.some-row-class {font-size: 9px;}'
);


Ext.define('Test43.view.GraphView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.graphview',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    border: true,
    height: 305,
    items: [
        {
            xtype: 'chart',
            store: 'GraphStore',
            width: '100%',
            minHeight: 150,
            height: 225,
            id: 'chtMain',
            margins: { top: 5, left: -20, right: 10, bottom: -60 },
            animate: false,
            shadow: false,
            axes: [
                {
                    title: '',
                    type: 'Numeric',
                    grid: true,
                    position: 'left',
                    fields: ['existing_loads', 'simulated_loads', 'loads_per_hour_avail', 'vehicle_count', 'loadAdded'],
                    minorTickSteps: 2
                },
                {
                    title: '',
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['time'],
                    steps: 24,
                    label:
                    {
<<<<<<< HEAD
			font: '16px Arial',
			 renderer: function(name) {
        			return '';
    				
			}
=======
                        //padding: 100,
                        font: '16px Arial',
                        //'text-anchor': 'middle',
                        renderer: function (v) {
                            //var a = '<span style="font-style:italic">abc</span>';
                            //return String(v).replace(v, '  ' + v + '    ');
                            //var val1 = v;
                            //var val2 = val1;
                            //val3 = Ext.util.Format.htmlDecode(val2);
                            //return Ext.util.Format.htmlDecode('&nbsp;' + v + '&nbsp;');

                            return String(v).replace(" ");

                        }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                    }
                }
            ],
            series: [
                {
                    type: 'line',
                    xField: 'time',
                    yField: 'loadAdded',
                    showMarkers: false,
                    style: {
                        stroke: '#FF0000',
                        'stroke-width': 2,
                        'strokeStyle': 'white',
                        'lineWidth': 1,
                        color: '#fff000',
                    }
                },
                {
                    type: 'line',
                    xField: 'time',
                    yField: 'vehicle_count',
                    style: {
                        stroke: '#FF0000',
                        'stroke-width': 2,
                        'stroke-dasharray': 3
                    },
                    showMarkers: false
                },
                {
                    type: 'line',
                    xField: 'time',
                    yField: 'loads_per_hour_avail',
                    showMarkers: false,
                    style: {
                        'stroke-width': 2,
                        stroke: 'rgb(148, 54, 52)'
                    }
                },
                {
                    type: 'column',
                    xField: 'time',
                    yField: ['existing_loads', 'simulated_loads'],
                    showMarkers: false,
                    style: {
                        'stroke-width': 0
                    },
                    stacked: true,
                    renderer: function (sprite, record, attr, index, store) {
                        if (index % 2) {
                            return Ext.apply(attr, {
                                fill: '#FF9900'
                            });
                        } else {
                            return Ext.apply(attr, {
                                fill: '#0000FF'
                            });
                        }
                    }
                },
                {
                    type: 'line',
                    xField: 'time',
                    yField: 'baseLine',
                    showMarkers: false,
                    style: {
                        'stroke-width': 1,
                        stroke: '#000000'
                    }
                }
            ]
        },


        //
<<<<<<< HEAD


        {
            layout: 'hbox',
            flex: 2,
            width: 720,
            border: false,
            defaultMargins: 20,
            items: [
                {
                    xtype: 'button',
                    text: '0',
                    id: 'btn0',
                    width: 21,
                    margin: { right: 0, left: 29, top: 0, bottom: 0 },
=======
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46

                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
                        Test43.app.getController('Main').showLoadsPerHour('00');
                    }
                },
                {
                    xtype: 'button',
                    text: '1',
                    id: 'btn1',
                    width: 21,
                    margin: { right: 0, left: 7, top: 0, bottom: 0 },

<<<<<<< HEAD
=======
        {
            layout: 'hbox',
            flex: 2,
            width: 720,
            border: false,
            defaultMargins: 20,
            items: [
                {
                    xtype: 'button',
                    text: '0',
                    id: 'btn0',
                    width: 21,
                    margin: { right: 0, left: 29, top: 0, bottom: 0 },

>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('01');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('00');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('00');
                    //     }
                    // }
                },
                {
                    xtype: 'button',
                    text: '1',
                    id: 'btn1',
                    width: 21,
                    margin: { right: 0, left: 7, top: 0, bottom: 0 },

                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
                        Test43.app.getController('Main').getLoadPerHour('01');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('01');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '2',
                    id: 'btn2',
                    width: 21,
                    margin: { right: 0, left: 7, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('02');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('02');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('02');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '3',
                    id: 'btn3',
                    width: 21,
                    margin: { right: 0, left: 7, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('03');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('03');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('03');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '4',
                    id: 'btn4',
                    width: 21,
                    margin: { right: 0, left: 7, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('04');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('04');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('04');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '5',
                    id: 'btn5',
                    width: 21,
                    margin: { right: 0, left: 7, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('05');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('05');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('05');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '6',
                    id: 'btn6',
                    width: 21,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('06');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('06');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('06');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '7',
                    id: 'btn7',
                    width: 21,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('07');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('07');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('07');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '8',
                    id: 'btn8',
                    width: 21,
                    margin: { right: 0, left: 7, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('08');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('08');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('08');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '9',
                    id: 'btn9',
                    width: 21,
                    margin: { right: 0, left: 7, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('09');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('09');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('09');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '10 ',
                    id: 'btn10',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('10');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('10');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('10');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '11 ',
                    id: 'btn11',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 5, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('11');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('11');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('11');
                    //     }
                    // }

>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '12',
                    id: 'btn12',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('12');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('12');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('12');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '13',
                    id: 'btn13',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('13');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('13');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('13');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '14',
                    id: 'btn14',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 5, top: 0, bottom: 0 },
                    scale: 'small',
                    style:
                    {
                        'font-size': '7px'
                    },
                    tabIndex: -1,
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('14');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('14');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('14');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '15',
                    id: 'btn15',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 5, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
                        Test43.app.getController('Main').showLoadsPerHour('15');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('15');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('15');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '16',
                    id: 'btn16',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 5, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
			Test43.app.getController('Main').showLoadsPerHour('16');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('16');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('16');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '17 ',
                    id: 'btn17',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
			Test43.app.getController('Main').showLoadsPerHour('17');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('17');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('17');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '18',
                    id: 'btn18',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 7, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
			Test43.app.getController('Main').showLoadsPerHour('18');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('18');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('18');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '19',
                    id: 'btn19',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
			Test43.app.getController('Main').showLoadsPerHour('19');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('19');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('19');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '20',
                    id: 'btn20',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
			Test43.app.getController('Main').showLoadsPerHour('20');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('20');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('20');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '21',
                    id: 'btn21',
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 5, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
			Test43.app.getController('Main').showLoadsPerHour('21');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('21');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('21');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '22',
                    id: 'btn22',
                    //font-size: 9;
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 5, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
			Test43.app.getController('Main').showLoadsPerHour('22');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('22');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('22');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '23',
                    id: 'btn23',
                    //font-size: 9;
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '7px'
                    },
                    handler: function () {
<<<<<<< HEAD
			Test43.app.getController('Main').showLoadsPerHour('23');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('23');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('23');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                },
                {
                    xtype: 'button',
                    text: '0',
                    id: 'btn24',
                    //font-size: 9;
                    width: 22,
                    center: true,
                    margin: { right: 0, left: 6, top: 0, bottom: 0 },
                    scale: 'small',
                    tabIndex: -1,
                    style:
                    {
                        'font-size': '4px'
                        //,'text-align:left'
                    },
                    handler: function () {
<<<<<<< HEAD
			Test43.app.getController('Main').showLoadsPerHour('00');
                    }
=======
                        Test43.app.getController('Main').getLoadPerHour('00');
                    },
                    // listeners:
                    // {
                    //     mouseover: function () {
                    //         Test43.app.getController('Main').getLoadPerHourSimple('00');
                    //     }
                    // }
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                }



            ]
        },




        //



        {
            xtype: 'chart',
            store: 'GraphStore',
            id: 'grpBottom',
            width: '100%',
            height: 125,
            minHeight: 125,
            margin: { top: -100, left: -25, bottom: -40, right: 10 },
            animate: false,
            shadow: false,
            //legend: {
            //    position: 'right'
            //},
            axes: [
                {
                    title: '',
                    type: 'Numeric',
                    position: 'left',
                    fields: ['available_vehicles'],
                    steps: 3
                },
                {
                    title: '',
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['time'],
<<<<<<< HEAD
                    steps: 24,
		    minimum: 0,
        	    adjustMinimumByMajorUnit: 0,
		    maximum: 24,
        	    adjustMaximumByMajorUnit: 24,
=======
                    steps: 23,
>>>>>>> 441e062610b5719b20a9b5212938c2e7f7729c46
                    label:
                    {
                        renderer: function (v) {
                            if (v == "24") {
                                return "0";

                            } else {
                                return v;

                            }
                        }
                    }
                }
            ],
            series: [
                {
                    type: 'line',
                    xField: 'time',
                    yField: 'available_vehicles',
                    showMarkers: false,
                    style: {
                        'stroke-width': 2,
                        stroke: '#9900FF'
                    }
                },
                {
                    type: 'line',
                    xField: 'time',
                    yField: 'baseLine',
                    showMarkers: false,
                    style: {
                        'stroke-width': 1,
                        stroke: '#000000'
                    }
                }
            ]
        }]
});
