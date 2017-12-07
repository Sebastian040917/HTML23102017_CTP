Ext.define('Test43.model.PumpListModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'EquipId', type: 'int' },
        { name: 'EquipName', type: 'string' },
        { name: 'Status', type: 'string' },
		{ name: 'Plant', type: 'string' }
    ]
});
