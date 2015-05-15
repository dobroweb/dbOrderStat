<?php

$settings = array();

$tmp = array(
	'product_fields' => array(
		'xtype' => 'textfield',
		'value' => 'name,option_size,weight,all_count,all_cost',
		'area' => 'dbos_main',
	),
	'vendor_fields' => array(
		'xtype' => 'textfield',
		'value' => 'vendor_name,all_count,all_cost',
		'area' => 'dbos_main',
	),
);

foreach ($tmp as $k => $v) {
	/* @var modSystemSetting $setting */
	$setting = $modx->newObject('modSystemSetting');
	$setting->fromArray(array_merge(
		array(
			'key' => 'dbos_' . $k,
			'namespace' => PKG_NAME_LOWER,
		), $v
	), '', true, true);

	$settings[] = $setting;
}

unset($tmp);
return $settings;
