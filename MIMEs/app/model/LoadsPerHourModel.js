Ext.define('Test43.model.LoadsPerHourModel', {
     extend: 'Ext.data.Model',
     fields: [
        { name: 'SessionId', type: 'string' },
        { name: 'Order', type: 'string' },
        { name: 'Item', type: 'string' },
        { name: 'SimuLoadflg', type: 'string' },
        { name: 'LoadDate', type: 'string' },
        { name: 'LoadTime', type: 'string' },  
  	{ name: 'Posex', type: 'string' },
        { name: 'Quantity', type: 'string' },
        { name: 'Status', type: 'string' },
        { name: 'MatNum', type: 'string' },
        { name: 'MatDesc', type: 'string' },
        { name: 'ReqDate', type: 'string' },
	{ name: 'ReqTime', type: 'string' },
        { name: 'Plant', type: 'string' },
        { name: 'Customer', type: 'string' },
        { name: 'CustoDesc', type: 'string' },
        { name: 'Jobsite', type: 'string' },
        { name: 'JobstDesc', type: 'string' }
    ]
});
