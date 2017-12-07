Ext.define('Test43.model.SessionDataModel', {
    extend: 'Ext.data.Model',
    requires: [
    'Test43.model.MepListModel',
    'Test43.model.ChartModel',
    'Test43.model.PumpListModel',
    'Test43.model.AssignPumpModel',
    'Test43.model.LoadsPerHourModel',
    'Test43.model.PumpDetailListModel'],
    fields: [
        { name: 'SessionId', type: 'string' },
        { name: 'Date', type: 'datetime' },
        { name: 'Time', type: 'string' },
        { name: 'DateFormat', type: 'string' },
        { name: 'DecimalSep', type: 'string' },
        { name: 'IsBatcher', type: 'string' },
        { name: 'ThousandSep', type: 'string' },
        { name: 'UserName', type: 'string' },
        { name: 'ShowCost', type: 'string' },
        { name: 'PumpDescript', type: 'string' },
        { name: 'PumpStartDate', type: 'string' },
        { name: 'PumpStartTime', type: 'string' },
        { name: 'PumpEndDate', type: 'string' },
        { name: 'PumpEndTime', type: 'string' },
        { name: 'HasPumping', type: 'string' },
        { name: 'HasConcrete', type: 'string' },
        { name: 'PumpId', type: 'int' }
    ],
    hasMany: [
        {
            name: 'MepList',
            model: 'Test43.model.MepListModel',
            associationKey: 'MEP_List.results'
        },
        {
            name: 'ChartList',
            model: 'Test43.model.ChartModel',
            associationKey: 'Chart_Elements.results'
        },
        {
            name: 'PumpList',
            model: 'Test43.model.PumpListModel',
            associationKey: 'Pump_List.results'
        },
        {
            name: 'AssignPump',
            model: 'Test43.model.AssignPumpModel',
            associationKey: 'AssignPump_List.results'
        },
	    {
            name: 'LoadDetails',
            model: 'Test43.model.LoadsPerHourModel',
            associationKey: 'LoadDetail_List.results'
        },
	    {
            name: 'PumpDetail',
            model: 'Test43.model.PumpDetailListModel',
            associationKey: 'PumpDetail_List.results'
        }
    ]
});
