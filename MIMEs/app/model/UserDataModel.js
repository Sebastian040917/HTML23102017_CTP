Ext.define('Test43.model.UserDataModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'PUname', type: 'string' },
        { name: 'PSalesOrg', type: 'string' },
        { name: 'PDistChannel', type: 'string' },
        { name: 'DateFormat', type: 'string' },
        { name: 'DecimalSep', type: 'string' },
        { name: 'IsBatcher', type: 'string' },
        { name: 'ThousandSep', type: 'string' },
        { name: 'UserName', type: 'string' },
        { nmae: 'ShowCost', type: 'string' }
    ],
    hasMany: [
        {
            name: 'Plant_List',
            model: 'Test43.model.PlantListModel',
            associationKey: 'Plant_List.results'
        }
    ]
});
