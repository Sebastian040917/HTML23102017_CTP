﻿Ext.define('Test43.model.PumpDetailListModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'SessionId', type: 'string' },
        { name: 'Order', type: 'string' },
        { name: 'ServDesc', type: 'string' },
        { name: 'Quantity', type: 'string' },
        { name: 'PumpId', type: 'string' },
        { name: 'PumpDesc', type: 'string' },
        { name: 'LicenseNum', type: 'string' },
        { name: 'Eqtyp', type: 'string' },
        { name: 'LoadLen', type: 'string' },
        { name: 'PumpType', type: 'string' },
        { name: 'PumpMax', type: 'string' },
        { name: 'StatusTx', type: 'string' },
        { name: 'StartPdate', type: 'string' },
        { name: 'StartPtime', type: 'string' },
        { name: 'EndPdate', type: 'string' },
        { name: 'EndPtime', type: 'string' },
        { name: 'DelivDate', type: 'string' },
        { name: 'DelivTime', type: 'string' },
        { name: 'Jobsite', type: 'string' },
        { name: 'JobstDesc', type: 'string' },
        { name: 'Pod', type: 'string' },
        { name: 'PodDesc', type: 'string' },
        { name: 'PodAddr', type: 'string' },
        { name: 'Customer', type: 'string' },
        { name: 'CustoDesc', type: 'string' },

        /* Map properties */
        { name: 'PlantLatitud', type: 'string' },
        { name: 'PlantLongitud', type: 'string' },
        { name: 'JobstLatitud', type: 'string' },
        { name: 'JobstLongitud', type: 'string' }



    ]
});