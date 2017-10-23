Ext.define('Test43.store.ItemsStore', {
    extend: 'Sch.data.EventStore',
    requires: [
        'Test43.model.ItemsModel'
    ],
    model: 'Test43.model.ItemsModel',
    storeId: 'ItemsStore',
    autoLoad: false,
    proxy: {
        type: 'memory'
    }
});
