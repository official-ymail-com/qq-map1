/**
* @package nginx-remote-proxy-cache-purge
*/

jQuery(document).ready(function($) {
	
/* 	function create_map(id){
		var Map = qq.maps.Map;
		var options = {
			'zoom': 11,
			'mapTypeId': "roadmap"
		};
		return new Map(document.getElementById(id), options);
	}
	
	function create_marker(id){
		var Map = qq.maps.Map;
		var LatLng = qq.maps.LatLng;
		var options = {
			'zoom': 11,
			'mapTypeId': "roadmap"
		};
		return new Map(document.getElementById(id), options);
	}
		
	var map = []; 
	
	map_items = jQuery.first( '.wpv-addon-maps-render' );
	jQuery.first(map_items, function(key_map, map_item){
		var map_id = jQuery(map_item).attr('id');
		var map = create_map(map_id);
		maps[map_id] = map;
	});
	
	console.log(map); */
	
	marker_items = jQuery( '.wpv-addon-maps-marker ' );
	
	var map_container= jQuery( '.wpv-addon-maps-render' ).first().attr('id');
		
	function $(a) {
		return document.getElementById(a);
	}
	
	window.init = function() {
		
		var Map = qq.maps.Map;
		var Marker = qq.maps.Marker;
		var LatLng = qq.maps.LatLng;
		var Event = qq.maps.event;
		
		var MarkerImage = qq.maps.MarkerImage;
		var MarkerShape = qq.maps.MarkerShape;
		var MarkerAnimation = qq.maps.MarkerAnimation;
		var Point = qq.maps.Point;
		var Size = qq.maps.Size;
		var ALIGN = qq.maps.ALIGN;
		
		var MVCArray = qq.maps.MVCArray;
		var MarkerCluster = qq.maps.MarkerCluster;
		var Cluster = qq.maps.Cluster;
		var MarkerDecoration = qq.maps.MarkerDecoration;
		
		var forEach = function(array, fun) {
			for (var i = 0, l = array.length; i < l; ++i) {
				if (fun(array[i], i) === false) {
					return false;
				}
			}
		};
		
		var latlng = new LatLng(26.57513, 106.71225700000002);
		var latlngBounds = new qq.maps.LatLngBounds();
		var options = {
			'zoom': 8,
			'center': latlng,
			'mapTypeId': "roadmap"
		};
 
		var map = new Map($(map_container), options);
		
		var markers = new MVCArray();
		var markerCluster;
		
		function createCluster() {
			for (var i = 0; i < marker_items.length; i++) {
				var latLng = new LatLng(
					jQuery(marker_items[i]).attr('data-markerlat'),
					jQuery(marker_items[i]).attr('data-markerlon')
				);
				var decoration = new MarkerDecoration(i, new Point(0, -5));
				var marker = new Marker({
					'position': latLng,
					'title': jQuery(marker_items[i]).attr('data-markertitle'),
					map: map
				});
				markers.push(marker);
			}
			
			markerClusterer = new MarkerCluster({
				map: map,
				minimumClusterSize: 2, //默认2
				markers: markers,
				zoomOnClick: true, //默认为true
				gridSize: 30, //默认60
				averageCenter: true, //默认false
				maxZoom: 18, //默认18
			});
			
			Event.addListener(markerClusterer, 'clusterclick', function(evt) {
				// writeLog("mouse event", eventType);
				var ss = evt;
				// alert('点击了聚合点');
			});
		};
		
		createCluster();
		
		var imgPath = "./images/";
		var Styles = {
			"People": [{
				icon: new MarkerImage(imgPath + "people35.png", new Size(35, 35), new Point(0, 0), new Point(16, 0)),
				text: new MarkerDecoration('<font style="color:#ff00ff;font-size:10px;font-weight:bold;">{num}</font>', new Point(0, 5))
			}],
			"Conversation": [{
				icon: new MarkerImage(imgPath + "conv30.png", new Size(30, 27), new Point(0, 0), new Point(3, 0)),
				text: new MarkerDecoration('<font style="color:#ff00ff;font-size:10px;font-weight:bold;">{num}</font>', new Point(0, -2))
			}]
		};
		
		var maker_add;
		
		var markers_add = [];
		
		function addMarkers() {
			var bounds = map.getBounds();
			var sw = bounds.getSouthWest();
			var ne = bounds.getNorthEast();
			var lngSpan = Math.abs(sw.getLng() - ne.getLng());
			var latSpan = Math.abs(ne.getLat() - sw.getLat());
			for (var i = 0; i < 100; i++) {
				var position = new qq.maps.LatLng(ne.getLat() - latSpan * (Math.random() * 0.95), sw.getLng() + lngSpan * (Math.random() * 0.95));
				
				var decoration = new MarkerDecoration(i, new Point(0, -5));
				var makeradd = new Marker({
					'position': position,
					decoration: decoration,
					map: map
				});
				markers_add.push(makeradd);
			}
			
			markerClusterer.addMarkers(markers_add);
		}
	};
});

jQuery(document).ready(function($){
	init();
});