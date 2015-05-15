<?php

abstract class dbOrderStatMainController extends modExtraManagerController {
	/** @var dbOrderStat $dbOrderStat */
	public $dbOrderStat;


	public function initialize() {
		require_once dirname(__FILE__) . '/model/dborderstat/dborderstat.class.php';
		$this->dbOrderStat = new dbOrderStat($this->modx);

		$this->addJavaScript($this->dbOrderStat->config['jsUrl'] . 'dborderstat.js');
		$this->addHtml(str_replace('		', '', '
		<script type="text/javascript">
			dbOrderStat.config = ' . $this->modx->toJSON($this->dbOrderStat->config) . ';
			dbOrderStat.config.connector_url = "' . $this->dbOrderStat->config['connectorUrl'] . '";
		</script>'));

		parent::initialize();
	}


	public function getLanguageTopics() {
		return array('dborderstat:default');
	}


	public function checkPermissions() {
		return true;
	}
}


/**
 * @package quip
 * @subpackage controllers
 */
class IndexManagerController extends dbOrderStatMainController {
	public static function getDefaultController() {
		return 'home';
	}
}
