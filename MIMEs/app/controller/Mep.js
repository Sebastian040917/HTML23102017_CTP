Ext.define('Test43.controller.Mep', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'grid',
            selector: 'gridpanel'
        }
    ],

    init: function (application) {
        var aux = this.getGrid();

    }
});
