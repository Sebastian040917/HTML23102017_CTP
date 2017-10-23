Ext.define('Test43.controller.MepController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'grid',
            selector: 'gridpanel'
        }
    ],

    init: function (application) {
        var aux = this.getGrid();

        //debugger;
    }
});
