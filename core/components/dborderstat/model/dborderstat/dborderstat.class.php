<?php
/**
 * The base class for dbOrderStat.
 */

class dbOrderStat {

	/* @var modX $modx */
	public $modx;
	public $namespace = 'dborderstat';
	public $cache = null;
	public $config = array();

	/**
	 * @param modX $modx
	 * @param array $config
	 */
	function __construct (modX &$modx, array $config = array()) {
		$this->modx =& $modx;
		$this->namespace = $this->modx->getOption('namespace', $config, 'dborderstat');
		$corePath = $this->modx->getOption('dbos_core_path', $config, $this->modx->getOption('core_path') . 'components/dborderstat/');
		$assetsUrl = $this->modx->getOption('dbos_assets_url', $config, $this->modx->getOption('assets_url') . 'components/dborderstat/');
		$connectorUrl = $assetsUrl . 'connector.php';
		$this->config = array_merge(array(
			'assetsUrl' => $assetsUrl,
			'jsUrl' => $assetsUrl . 'js/',
			'imagesUrl' => $assetsUrl . 'images/',
			'connectorUrl' => $connectorUrl,
			'corePath' => $corePath,
			'processorsPath' => $corePath . 'processors/'
		), $config);
	}

}