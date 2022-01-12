<?php
/*
Plugin Name: QQ Map
Description: Display QQ Map in WordPress
Version: 1.0
 */
 
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
define( 'VERSION_QQMAP_PLUGIN',  '1.0');
define( 'PATH_QQMAP_PLUGIN',  plugin_dir_path( __FILE__ ));
define( 'URL_QQMAP_PLUGIN',  plugins_url('', __FILE__));

require_once(PATH_QQMAP_PLUGIN . 'class/qq-map.class.php');
add_action( 'plugins_loaded', array( 'qq_map_class', 'init' ) );