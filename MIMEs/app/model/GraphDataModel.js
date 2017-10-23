Ext.define('Test43.model.GraphDataModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'time', type: 'decimal' },
        { name: 'loads_per_hour_avail', type: 'int' },
        { name: 'available_vehicles', type: 'int' },
        { name: 'simulated_loads', type: 'int' },
        { name: 'existing_loads', type: 'int' },
        { name: 'vehicle_count', type: 'int' },
        { name: 'plant', type: 'string' },
        { name: 'loadAdded', type: 'int' },
        { name: 'baseLine', type: 'int' }]
});
