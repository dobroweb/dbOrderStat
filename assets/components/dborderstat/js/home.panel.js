dbOrderStat.page.Home = function(config) {
	config = config || {};
	Ext.applyIf(config,{
		components: [{
			xtype: 'dbos-panel-home'
			,renderTo: 'dbos-panel-home-div'
		}]
	});
	dbOrderStat.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(dbOrderStat.page.Home,MODx.Component);
Ext.reg('dbos-page-home',dbOrderStat.page.Home);

dbOrderStat.panel.Home = function(config) {
	config = config || {};
	Ext.apply(config,{
		border: false
		,deferredRender: true
		,baseCls: 'modx-formpanel'
		,items: [{
			html: '<h2>'+_('dbos_home') + '</h2>'
			,border: false
			,cls: 'modx-page-header container'
		},{
			xtype: 'modx-tabs'
			,bodyStyle: 'padding: 10px'
			,defaults: { border: false ,autoHeight: true }
			,border: true
			,hideMode: 'offsets'
			,stateful: true
			,stateId: 'dbos-home-tabpanel'
			,stateEvents: ['tabchange']
			,getState:function() {return { activeTab:this.items.indexOf(this.getActiveTab())};}
			,items: [{
				title: _('dbos_product')
				,items: [{
					html: '<p>'+_('dbos_product_intro')+'</p>'
					,border: false
					,bodyCssClass: 'panel-desc'
					,bodyStyle: 'margin-bottom: 10px'
				},{
					xtype: 'dbos-grid-product'
					,id: 'dbos-grid-product'
				}]
			},{
				title: _('dbos_vendor')
				,items: [{
					html: '<p>'+_('dbos_vendor_intro')+'</p>'
					,border: false
					,bodyCssClass: 'panel-desc'
					,bodyStyle: 'margin-bottom: 10px'
				},{
					xtype: 'dbos-grid-vendor'
					,id: 'dbos-grid-vendor'
				}]
			}]
		}]
	});
	dbOrderStat.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(dbOrderStat.panel.Home,MODx.Panel);
Ext.reg('dbos-panel-home',dbOrderStat.panel.Home);