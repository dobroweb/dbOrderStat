<?php

class msProductGetListProcessor extends modObjectGetListProcessor {
	public $classKey = 'msOrderProduct';
	public $languageTopics = array('dborderstat:default','minishop2:product');
	public $defaultSortField = 'all_cost';
	public $defaultSortDirection  = 'DESC';
	public $permission = 'msorder_list';


	/** {@inheritDoc} */
	public function initialize() {
		if (!$this->modx->hasPermission($this->permission)) {
			return $this->modx->lexicon('access_denied');
		}
		return parent::initialize();
	}


	/** {@inheritDoc} */
	public function prepareQueryBeforeCount(xPDOQuery $c) {
		$c->innerJoin('msOrder','msOrder', '`msOrderProduct`.`order_id` = `msOrder`.`id`');
		$c->leftJoin('msProduct','msProduct', '`msOrderProduct`.`product_id` = `msProduct`.`id`');
		$c->leftJoin('msProductData','msProductData', '`msOrderProduct`.`product_id` = `msProductData`.`id`');
		$c->leftJoin('msVendor','msVendor', '`msProductData`.`vendor` = `msVendor`.`id`');
		$c->groupby('`msVendor`.`name`');

		$c->select($this->modx->getSelectColumns('msOrderProduct','msOrderProduct'));
		$c->select($this->modx->getSelectColumns('msOrder','msOrder','order_'));
		$c->select($this->modx->getSelectColumns('msProduct','msProduct', 'product_'));
		$c->select($this->modx->getSelectColumns('msProductData','msProductData', 'product_', array('id'), true));
		$c->select($this->modx->getSelectColumns('msVendor','msVendor', 'vendor_', array('id'), true));
		$c->select('SUM(`msOrderProduct`.`count`) as `all_count`');
		$c->select('SUM(`msOrderProduct`.`cost`) as `all_cost`');

		if ($query = $this->getProperty('query',null)) {
			$where['msVendor.name:LIKE'] = '%'.$query.'%';
			$c->where($where);
		}
		if ($datestart = $this->getProperty('datestart',null)) {
			$qdstart['msOrder.createdon:>='] = date('Y-m-d 00:00:00',strtotime($datestart));
			$c->where($qdstart);
		}
		if ($datestop = $this->getProperty('datestop',null)) {
			$qdstop['msOrder.createdon:<='] = date('Y-m-d 23:59:59',strtotime($datestop));
			$c->where($qdstop);
		}

		return $c;
	}


	/** {@inheritDoc} */
	public function prepareRow(xPDOObject $object) {
		$fields = array_map('trim', explode(',', $this->modx->getOption('dbos_vendor_fields', null, '')));
		$fields = array_values(array_unique(array_merge($fields, array('id','product_id','name','product_pagetitle'))));

		$data = array();
		foreach ($fields as $v) {
			$data[$v] = $object->get($v);
			if ($v == 'product_price' || $v == 'product_old_price') {$data[$v] = round($data[$v],2);}
			else if ($v == 'product_weight') {$data[$v] = round($data[$v],3);}
		}

		$data['vendor_name'] = !$object->get('vendor_name')
			? $this->modx->lexicon('dbos_vendor_noname')
			: $object->get('vendor_name');

		$options = $object->get('options');
		if (!empty($options) && is_array($options)) {
			$tmp = array();
			foreach ($options as $k => $v) {
				$tmp[] = $this->modx->lexicon('ms2_'.$k) . ': ' .$v;
				$data['option_'.$k] = $v;
			}
			$data['options'] = implode('; ', $tmp);
		}

		return $data;
	}


}

return 'msProductGetListProcessor';