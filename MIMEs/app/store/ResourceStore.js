Ext.define('Test43.store.ResourceStore', {
    extend: 'Sch.data.ResourceStore',
    requires: [
             'Test43.model.OrderResource'
    ],
    model: 'Test43.model.OrderResource',
    storeId: 'ResourceStore',
    proxy: {
        type: 'memory'
        //data se settea al momento de dar Click en el botón, ya que cada click cambia la posición de memoria
    },
    folderSort: false
});
