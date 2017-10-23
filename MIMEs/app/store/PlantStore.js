Ext.define('Test43.store.PlantStore', {
    requires: [
        'Test43.model.PlantModel'
    ],
    extend: 'Ext.data.Store',
    model: 'Test43.model.PlantModel',
    storeId: 'PlantStore',
    autoLoad: false,
    proxy: {
        type: 'memory'
    }
});