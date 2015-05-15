var dbOrderStat = function(config) {
	config = config || {};
	dbOrderStat.superclass.constructor.call(this,config);
};
Ext.extend(dbOrderStat,Ext.Component,{
	page:{},window:{},grid:{},tree:{},panel:{},combo:{},config:{},view:{}
});
Ext.reg('dborderstat',dbOrderStat);
dbOrderStat = new dbOrderStat();
dbOrderStat.PanelSpacer = { html: '<br />' ,border: false, cls: 'dborderstat-panel-spacer' };