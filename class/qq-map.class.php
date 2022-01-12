<?php
/**
* @package qq-map
*/
 
class qq_map_class{
	
	private static $initiated = false;
	private static $qqmap_api_key = '';
	private static $nrpcp_purge_path = 'purge';
	
	/**
	* Init
	*/
	public static function init() {
		if ( ! self::$initiated ) {
			self::init_hooks();
		}
	}
	
	/**
	* add actions/filters
	*/
	public static function init_hooks() {
		self::$initiated = true;
		self::get_option_values();
		//add_action( 'admin_bar_menu', array('nrpcp_class', 'admin_bar_menu'), 999);
		add_action( 'wp_footer', array('qq_map_class', 'replace_js'), 11 );
	}
	
	
	/**
	* Enqueue JS/CSS files
	*/
	public static function replace_js(){
		if(!is_admin()){
			if(wp_script_is( 'google-maps', 'registered' )){
				wp_dequeue_script( 'google-maps' );
				wp_deregister_script( 'google-maps' );
				wp_register_script( 'qq-map-api', 'https://map.qq.com/api/js?v=2.exp&amp;key=' . self::$qqmap_api_key, array(), VERSION_QQMAP_PLUGIN, 1 );
				wp_register_script( 'qq-map-js', URL_QQMAP_PLUGIN . '/assets/js/qq-map.js', array('jquery', 'qq-map-api'), VERSION_QQMAP_PLUGIN, 1 );
				wp_enqueue_script( 'qq-map-js' );
			}
			if(wp_script_is( 'jquery-geocomplete', 'registered' )){
				wp_dequeue_script( 'jquery-geocomplete' );
				wp_deregister_script( 'jquery-geocomplete' );
			}
		}
	}
	
	/**
	* get option values
	*/	
	public static function get_option_values(){
		if(defined('QQMAP_API_KEY')){
			self::$qqmap_api_key = QQMAP_API_KEY;
		}
	}
	
	
}