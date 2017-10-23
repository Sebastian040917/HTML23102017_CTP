Ext.define('Test43.store.GenericComboStore', {
    requires: [
        'Test43.model.GenericComboModel'
    ],
    extend: 'Ext.data.Store',
    model: 'Test43.model.GenericComboModel',
    storeId: 'GenericcomboStore',
    proxy: {
        type: 'memory'
    }
});