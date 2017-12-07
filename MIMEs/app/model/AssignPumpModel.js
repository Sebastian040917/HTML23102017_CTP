Ext.define('Test43.model.AssignPumpModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'EquipId', type: 'int' },
        { name: 'FromDate', type: 'string' },
        { name: 'FromTime', type: 'string' },
        { name: 'ToDate', type: 'string' },
        { name: 'ToTime', type: 'string' },
        { name: 'Color', type: 'string' },
        { name: 'Order', type: 'string' }
    ]
});
