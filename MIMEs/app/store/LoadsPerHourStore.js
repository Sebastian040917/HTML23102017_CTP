Ext.define('Test43.store.LoadsPerHourStore', {
requires: [
	'Test43.model.LoadsPerHourModel'
    ],
    extend: 'Ext.data.Store',
    model: 'Test43.model.LoadsPerHourModel',
    storeId: 'LoadsPerHourStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: params.baseUrl + "/sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + params.sessionId + "')?$expand=LoadDetail_List&$format=json",
        reader: {
            type: 'json',
            root: 'd.results'
        }
    }

});