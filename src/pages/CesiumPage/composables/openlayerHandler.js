import sceneProfiles from '../assets/scenes/profiles.json'

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { XYZ } from 'ol/source';
import * as control from 'ol/control';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {defaults} from 'ol/interaction';
import {fromLonLat} from 'ol/proj';

const defaultZoom = 16
const defaultCenter = [6.6270042,46.5170798]

/**
 * Init Openlayer map
 * 
 * @param {number[]} mapcenter center of the map in EPSG:3857
 * @param {number} mapzoom zommlevel
 * @returns {Map} initmap new ol map
 */
export function initOpenlayerCS (containerName, isBasemap = true) {
    let basemap = ''
    // Test if radar or 2D map
    if (isBasemap) {
        basemap = 'https://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    }
    basemap = new TileLayer({ 
        source: new XYZ({ 
            url:basemap,
        })
    });
    const olmap = new Map({
        layers: [
            basemap
        ],
        target: containerName,
        view: new View({
            center: fromLonLat(defaultCenter),
            rotation: 0,
            zoom: defaultZoom,
        }),
        controls : control.defaults({
            attribution : false,
            zoom : false,
            rotate: false
        }),
        interactions: defaults({
            mouseWheelZoom: false,
            dragPan: false, 
        })
    });
    return olmap;
}

export function initMarkerOpenlayerCS(olmap, isStyle = true){
    //user marker
    let markerOptions = { scale: 0.1, src: "../assets/icons/avatar2D.png" }
    // Test if radar
    if (!isStyle) {  
        markerOptions = { scale: 0.02, src: "../assets/icons/abstractAvatar2D.png" }
    }

    const userMarker = createOLMarker(defaultCenter[0], defaultCenter[1])
    addOLMarkerIconStyle(userMarker, markerOptions)
    
    const userMarkerLayer = addOLMarkerToMap(olmap, [userMarker])

    // Project Marker
    let sceneMarkers = []
    sceneProfiles.forEach(asset => {
        let sceneMarker = createOLMarker(asset.lat, asset.lon)
        markerOptions = { scale: 0.05, src: "../assets/icons/sandcastle.png" }
        // Test if radar
        if (!isStyle) {  
            markerOptions = { scale: 0.006, src: "../assets/icons/abstractProject2D.png" }
        }
        addOLMarkerIconStyle(sceneMarker, markerOptions)
        sceneMarkers.push(sceneMarker)
    });
    addOLMarkerToMap(olmap, sceneMarkers)
    return userMarker
}

function createOLMarker(lat, lon){
    const marker = new Feature({
        geometry: new Point(fromLonLat([lat, lon])),
    });
    return marker;
}

function addOLMarkerIconStyle(marker, markerOptions){
    marker.setStyle(new Style({
        image: new Icon(markerOptions),
    }));
}

function addOLMarkerToMap(map, markers){
    const vectorLayer = new VectorLayer({
        source: new VectorSource({
            features: markers,
        }),
    });
    map.addLayer(vectorLayer);
    return vectorLayer;
}

export function updateOLPosition(olmap, olmarker, lat, lon){
    console.log(lat, lon)
    olmap.getView().setCenter(fromLonLat([lon,lat]))
    olmarker.setGeometry(new Point(fromLonLat([lon,lat])));
}

export function rotateOLMap(olmap, angle){
    // inverse rotation // opposite to cesium
    angle = degToRad(360- angle)
    olmap.getView().setRotation(angle);
}

export function rotateOLMarker(olmarker, angle){
    angle = degToRad(angle)
    olmarker.getStyle().getImage().setRotation(angle);
}

function degToRad(angle){
    return angle * (Math.PI / 180);
}