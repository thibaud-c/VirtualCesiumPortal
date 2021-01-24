<template lang="pug">
#l-container
</template>

<script>
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"

export default {
  name: "LeafletMapView",
  props:{
    latitude:Number,
    longitude:Number
  },
  data() {
    return {
      lmap:null,
      lmarker:null,
      zoom: 17
    }
  },
  watch: { 
    latitude: function(newVal) { // watch it
      this.lmap.setView(new L.LatLng(newVal, this.longitude), this.zoom);
      this.lmarker.setLatLng(new L.LatLng(newVal, this.longitude)).update();
    }
  },
  methods: {
    /**
     * Init Leaflet map
     * 
     * @param {number[]} mapcenter center of the map in EPSG:3857
     * @param {number} mapzoom zommlevel
     * @returns {Map} initmap new leaflet map
     */
    setupLeafletMap(mapcenter,mapzoom) {
      let init_map = L.map("l-container", {zoomControl: false}).setView(mapcenter, mapzoom);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '©OpenStreetMap, ©CartoDB'
      }).addTo(init_map);
      return init_map;
    },
    /**
     * Init Leaflet marker
     * 
     * @param {number[]} position positon of the marker
     * @param {number} mapzoom zommlevel
     * @returns {Marker} leaflet marker
     */
    setupLeafletMarker(position){
      let icon_marker = new L.Icon({
        iconUrl: markerIconPng,  
        iconSize: [8, 8],
        iconAnchor: [2, 2],
        popupAnchor: [0, -2]
      })
      let init_marker = new L.Marker(position,{
        icon:icon_marker
      }).addTo(this.lmap);
      return init_marker;
    }
    
  },
  mounted() {
    this.lmap = this.setupLeafletMap([this.latitude,this.longitude],this.zoom);
    this.lmarker = this.setupLeafletMarker([this.latitude,this.longitude]) ;
  }
};
</script>

<style scoped>
#l-container {
  height:100%;
  width:100%;
}
</style>