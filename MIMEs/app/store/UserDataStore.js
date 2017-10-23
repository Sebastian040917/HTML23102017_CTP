Ext.define('Test43.store.UserDataStore', {
    requires: [
        'Test43.model.UserDataModel'
    ],
    extend: 'Ext.data.Store',
    model: 'Test43.model.UserDataModel',
    storeId: 'UserDataStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: params.urlPrefix + 'TestService/Grafica/' + params.userId + '/D159' ,
        //url: params.urlPrefix + 'data/GraphData.json',
        //url: sessionData.urlPrefix + '/ZCXGS_BPPSFCBM_DASH_CATS/Zones?$expand=NavCluster&$format=json',
        reader: {
            type: 'json',
            root: 'd'
        }
    }
});