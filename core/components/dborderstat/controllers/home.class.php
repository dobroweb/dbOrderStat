<?php
require_once dirname(dirname(__FILE__)) . '/index.class.php';

class ControllersHomeManagerController extends dbOrderStatMainController {
	public static function getDefaultController() {
		return 'home';
	}
}

class DborderstatHomeManagerController extends dbOrderStatMainController {

	public function getPageTitle() {
		return $this->modx->lexicon('dbos_home');
	}
	
	public function getLanguageTopics() {
		return array('dborderstat:default','minishop2:default','minishop2:product','minishop2:manager');
	}

	public function loadCustomCssJs() {
		$this->addJavascript($this->dbOrderStat->config['jsUrl'] . 'home.panel.js');
		$this->addJavascript($this->dbOrderStat->config['jsUrl'] . 'product.grid.js');
		$this->addJavascript($this->dbOrderStat->config['jsUrl'] . 'vendor.grid.js');

		$product_fields = array_map('trim', explode(',', $this->modx->getOption('dbos_product_fields', null, 'name,option_size,weight,all_count,all_cost')));
		$product_fields = array_values(array_unique(array_merge($product_fields, array('id', 'product_id', 'name'))));
		$vendor_fields = array_map('trim', explode(',', $this->modx->getOption('dbos_vendor_fields', null, 'vendor_name,all_count,all_cost')));
		$vendor_fields = array_values(array_unique(array_merge($vendor_fields, array('vendor_id', 'vendor_name'))));
		
		$this->addHtml(str_replace('			', '', '
			<script type="text/javascript">
				dbOrderStat.config.product_fields = ' . $this->modx->toJSON($product_fields) . ';
				dbOrderStat.config.vendor_fields = ' . $this->modx->toJSON($vendor_fields) . ';
				Ext.onReady(function() {
					MODx.load({ xtype: "dbos-page-home"});
				});
			</script>'
		));
		$this->modx->invokeEvent('msOnManagerCustomCssJs', array('controller' => &$this, 'page' => 'home'));
	}

	public function getTemplateFile() {
		return $this->dbOrderStat->config['templatesPath'] . 'home.tpl';
	}

}

// MODX 2.3
class ControllersMgrHomeManagerController extends ControllersHomeManagerController {
	public static function getDefaultController() {
		return 'home';
	}
}

class DbosMgrHomeManagerController extends DborderstatHomeManagerController {
}