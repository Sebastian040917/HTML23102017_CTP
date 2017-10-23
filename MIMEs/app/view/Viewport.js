Ext.define('Test43.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Test43.view.Main'
    ],

    layout: {
        type: 'fit',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'app-main'
        }]
});
