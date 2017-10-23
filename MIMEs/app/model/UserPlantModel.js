Ext.define('Test43.model.UserPlantModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'plant', type: 'string' },
        { name: 'plant_name', type: 'string' },
        { name: 'travel_time', type: 'datetime' },
        { name: 'distance', type: 'decimal' },
        { name: 'cost', type: 'decimal' },
        { name: 'ctp_icon', type: 'string' },
        { name: 'isselected', type: 'bool' },
        { name: 'Date', type: 'datetime' },
        { name: 'Time', type: 'string' },
        { name: 'Color', type: 'string' }]
});
