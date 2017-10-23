Ext.define('Test43.model.ChartModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'LoadsPerHourAvail', type: 'int' },
        { name: 'VehicleAvail', type: 'int' },
        { name: 'SimulatedLoads', type: 'int' },
        { name: 'ExistingLoads', type: 'int' },
        { name: 'VehicleCount', type: 'int' },
        { name: 'Time', type: 'string' },
        { name: 'Date', type: 'string' },
        { name: 'Plant', type: 'string' },
        { name: 'SimultaneousLoads', type: 'int' }]
});
