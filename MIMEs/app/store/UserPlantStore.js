Ext.define('Test43.store.UserPlantStore', {
    requires: [
        'Test43.model.UserPlantModel'
    ],
    extend: 'Ext.data.Store',
    model: 'Test43.model.UserPlantModel',
    storeId: 'UserPlantStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        //url: params.urlPrefix + 'TestService/Mep/' + params.userId + '/' + params.noPlants,
        url: params.urlPrefix + 'data/UserPlants.json',
        reader: {
            type: 'json',
            root: 'd.results'
        }
    }
});