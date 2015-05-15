dbOrderStat.grid.Vendor = function(config) {
	config = config || {};

	Ext.applyIf(config,{
		id: 'dbos-grid-vendor'
		,url: dbOrderStat.config.connector_url
		,baseParams: {
			action: 'vendor/getlist'
		}
		,fields: dbOrderStat.config.vendor_fields
		,autoHeight: true
		,paging: true
		,remoteSort: true
		,pageLimit: 20
		,bodyCssClass: 'grid-with-buttons'
		,cls: 'dbos-grid'
		,columns: this.getColumns()
		,tbar: [_('dbos_product_date'),'-',{
			xtype: 'datefield'
			,name: 'datestart'
			,id: 'dbos-vendor-datestart'
			,emptyText: _('dbos_product_datestart')
			,maxValue: new Date()
			,format: 'd-m-Y'
			,listeners: {
				change: {fn: function(tf) {this.Filter(tf);},scope: this}
				,render: {fn: function(tf) {tf.setValue('');},scope: this}
			}
		},{
			xtype: 'datefield'
			,name: 'datestop'
			,id: 'dbos-vendor-datestop'
			,emptyText: _('dbos_product_datestop')
			,maxValue: new Date()
			,format: 'd-m-Y'
			,listeners: {
				change: {fn: function(tf) {this.Filter(tf);},scope: this}
				,render: {fn: function(tf) {tf.setValue('');},scope: this}
			}
		},'->',{
			xtype: 'textfield'
			,name: 'query'
			,width: 200
			,id: 'dbos-vendor-search'
			,emptyText: _('ms2_search')
			,listeners: {render: {fn: function(tf) {
				tf.getEl().addKeyListener(Ext.EventObject.ENTER, function() {this.Filter(tf);}, this);
				tf.setValue('');
			},scope: this}}
		},{
			xtype: 'button'
			,id: 'dbos-vendor-clear'
			,text: '<i class="'+ (MODx.modx23 ? 'icon icon-times' : 'bicon-remove-sign') + '"></i>'
			,listeners: {
				click: {fn: this.clearFilter, scope: this}
			}
		}]
	});
	dbOrderStat.grid.Vendor.superclass.constructor.call(this,config);
	this.changed = false;
};
Ext.extend(dbOrderStat.grid.Vendor,MODx.grid.Grid,{
	windows: {}

	,Filter: function(tf, nv, ov) {
		var s = this.getStore();
		s.baseParams.query = Ext.getCmp('dbos-vendor-search').getValue();
		s.baseParams.datestart = Ext.getCmp('dbos-vendor-datestart').getValue();
		s.baseParams.datestop = Ext.getCmp('dbos-vendor-datestop').getValue();
		this.getBottomToolbar().changePage(1);
		this.refresh();
	}

	,clearFilter: function(btn,e) {
		var s = this.getStore();
		s.baseParams.query = '';
		s.baseParams.datestart = '';
		s.baseParams.datestop = '';
		Ext.getCmp('dbos-vendor-search').setValue('');
		Ext.getCmp('dbos-vendor-datestart').setValue('');
		Ext.getCmp('dbos-vendor-datestop').setValue('');
		this.getBottomToolbar().changePage(1);
		this.refresh();
	}

	,getColumns: function() {
		var fields = {
			id: {hidden: true, sortable: true, width: 40}
			,vendor_name: {header: _('ms2_product_vendor'), sortable: true, width: 100}
			,all_count: {header: _('dbos_product_allcount'), sortable: true, width: 50}
			,all_cost: {header: _('ms2_cost'), sortable: true, width: 50}
		};

		var columns = [];
		for(var i=0; i < dbOrderStat.config.vendor_fields.length; i++) {
			var field = dbOrderStat.config.vendor_fields[i];
			if (fields[field]) {
				Ext.applyIf(fields[field], {
					header: _('ms2_' + field)
					,dataIndex: field
				});
				columns.push(fields[field]);
			}
			else if (/^option_/.test(field)) {
				columns.push(
					{header: _(field.replace(/^option_/, 'ms2_vendor_')), dataIndex: field, width: 50}
				);
			}
			else if (/^product_/.test(field)) {
				columns.push(
					{header: _(field.replace(/^product_/, 'ms2_')), dataIndex: field, width: 75}
				);
			}
		}

		return columns;
	}
});
Ext.reg('dbos-grid-vendor',dbOrderStat.grid.Vendor);