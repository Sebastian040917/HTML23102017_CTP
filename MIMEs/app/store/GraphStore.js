Ext.define('Test43.store.GraphStore', {
    requires: [
        'Test43.model.GraphDataModel'
    ],
    extend: 'Ext.data.Store',
    model: 'Test43.model.GraphDataModel',
    storeId: 'GraphStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'd.results'
        }
    }
});