Ext.define('Test43.store.SessionDataStore', {
    requires: [
        'Test43.model.SessionDataModel',
        'Test43.model.MepListModel',
	'Test43.model.LoadsPerHourModel'
    ],
    extend: 'Ext.data.Store',
    model: 'Test43.model.SessionDataModel',
    storeId: 'SessionDataStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: params.baseUrl + "/sap/opu/odata/sap/ZCXGS_CSDSLSBM_LS_ORDER_PLAN/ServerSideObjects('" + params.sessionId + "')?$expand=MEP_List,Chart_Elements,LoadDetail_List&$format=json",
        reader: {
            type: 'json',
            root: 'd'
        }
    }
});