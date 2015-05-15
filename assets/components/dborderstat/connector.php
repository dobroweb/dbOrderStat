<?php

require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';

$corePath = $modx->getOption('dbos_core_path', null, $modx->getOption('core_path') . 'components/dborderstat/');
require_once $corePath . 'model/dborderstat/dborderstat.class.php';
$modx->dbOrderStat = new dbOrderStat($modx);

$modx->lexicon->load(array('dborderstat:default'));

/* handle request */
$path = $modx->getOption('processorsPath', $modx->dbOrderStat->config, $corePath . 'processors/');
$modx->request->handleRequest(array(
	'processors_path' => $path,
	'location' => '',
));