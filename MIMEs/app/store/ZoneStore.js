Ext.define('Test43.store.ZoneStore', {
    extend: 'Ext.data.JsonStore',
    requires: [
         'Test43.model.Zone'
    ],
    model: 'Test43.model.Zone',
    storeId: 'ZoneStore'
});