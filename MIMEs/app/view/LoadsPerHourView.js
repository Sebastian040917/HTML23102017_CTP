
Ext.define('Test43.view.LoadsPerHourView', {
    requires: [],
    extend: 'Ext.grid.Panel',
    alias: 'widget.loadsPerHourView',
    border: false,
    items: [
        {
            xtype: 'schedulergrid',
            id: 'gdLoadsPH',
            //store: store,
            columns: [
                 {text: "Order", width: 100, dataIndex: 'salesOrder', sortable: true},
                 {text: "Load Number", width : 100, dataIndex: 'loadNumber', sortable: true},
                 {text: "Status", width: 100, dataIndex: 'status', sortable: true},
                 {text: "Technical Production Description", width: 100, dataIndex: 'techdesc', sortable: true},
                 {text: "Delivery Date/Time", width: 100, dataIndex: 'deliveryDate', sortable: true},
                 {text: "Load Date/Time", width: 100, dataIndex: 'loadDate', sortable: true},
                 {text: "Requirement Date/Time", width: 100, dataIndex: 'requirementDate', sortable: true},
                 {text: "Optimal Plant", width: 100, dataIndex: 'optimalPlant', sortable: true},
                 {text: "Customer Number", width: 100, dataIndex: 'customerNumber', sortable: true},
                 {text: "JobSite Number", width: 100, dataIndex: 'jobSiteNumber', sortable: true}
            ],
            forceFit: true,
            height:210,
            split: true,
            region: 'north'
        }
    ]
});


