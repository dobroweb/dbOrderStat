dbOrderStat.grid.Product = function(config) {
	config = config || {};

	Ext.applyIf(config,{
		id: 'dbos-grid-product'
		,url: dbOrderStat.config.connector_url
		,baseParams: {
			action: 'product/getlist'
		}
		,fields: dbOrderStat.config.product_fields
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
			,id: 'dbos-product-datestart'
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
			,id: 'dbos-product-datestop'
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
			,id: 'dbos-product-search'
			,emptyText: _('ms2_search')
			,listeners: {render: {fn: function(tf) {
				tf.getEl().addKeyListener(Ext.EventObject.ENTER, function() {this.Filter(tf);}, this);
				tf.setValue('');
			},scope: this}}
		},{
			xtype: 'button'
			,id: 'dbos-product-clear'
			,text: '<i class="'+ (MODx.modx23 ? 'icon icon-times' : 'bicon-remove-sign') + '"></i>'
			,listeners: {
				click: {fn: this.clearFilter, scope: this}
			}
		}]
	});
	dbOrderStat.grid.Product.superclass.constructor.call(this,config);
	this.changed = false;
};
Ext.extend(dbOrderStat.grid.Product,MODx.grid.Grid,{
	windows: {}

	,Filter: function(tf, nv, ov) {
		var s = this.getStore();
		s.baseParams.query = Ext.getCmp('dbos-product-search').getValue();
		s.baseParams.datestart = Ext.getCmp('dbos-product-datestart').getValue();
		s.baseParams.datestop = Ext.getCmp('dbos-product-datestop').getValue();
		this.getBottomToolbar().changePage(1);
		this.refresh();
	}

	,clearFilter: function(btn,e) {
		var s = this.getStore();
		s.baseParams.query = '';
		s.baseParams.datestart = '';
		s.baseParams.datestop = '';
		Ext.getCmp('dbos-product-search').setValue('');
		Ext.getCmp('dbos-product-datestart').setValue('');
		Ext.getCmp('dbos-product-datestop').setValue('');
		this.getBottomToolbar().changePage(1);
		this.refresh();
	}

	,getColumns: function() {
		var fields = {
			id: {hidden: true, sortable: true, width: 40}
			,product_id: {hidden: true, sortable: true, width: 40}
			,name: {header: _('ms2_name'), width: 100, renderer: this._productLink}
			,product_weight: {header: _('ms2_product_weight'), width: 50}
			,product_price: {header: _('ms2_product_price'), width: 50}
			,product_article: {width: 50}
			,weight: {sortable: true, width: 50}
			,price: {sortable: true, header: _('ms2_product_price'), width: 50}
			,all_count: {header: _('dbos_product_allcount'), sortable: true, width: 50}
			,all_cost: {header: _('ms2_cost'), sortable: true, width: 50}
			,cost: {width: 50}
			,options: {width: 100}
		};

		var columns = [];
		for(var i=0; i < dbOrderStat.config.product_fields.length; i++) {
			var field = dbOrderStat.config.product_fields[i];
			if (fields[field]) {
				Ext.applyIf(fields[field], {
					header: _('ms2_' + field)
					,dataIndex: field
				});
				columns.push(fields[field]);
			}
			else if (/^option_/.test(field)) {
				columns.push(
					{header: _(field.replace(/^option_/, 'ms2_product_')), dataIndex: field, width: 50}
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
	
	,_productLink: function(val,cell,row) {
		if (!val) {return '';}
		else if (!row.data['product_id']) {return val;}
		var action = MODx.action ? MODx.action['resource/update'] : 'resource/update';
		var url = 'index.php?a='+action+'&id='+row.data['product_id'];
		return '<a href="' + url + '" target="_blank" class="ms2-link">' + val + '</a>'
	}
});
Ext.reg('dbos-grid-product',dbOrderStat.grid.Product);