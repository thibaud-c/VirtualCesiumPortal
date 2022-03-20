import sceneProfiles from '../../../assets/scenes/profiles.json'
import i18n from '../../../i18n'


const containerName = 'cesium-container'
const initZoom = 17

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

/**
* Init Cesium globe
* 
* @returns {Viewer} viewer from cesium
*/
export function initGlobeCS () {

    const viewerCS = new Cesium.Viewer(containerName, {
        homeButton: false,
        baseLayerPicker: false,
        geocoder: false,
        selectionIndicator: false,
        navigationHelpButton: false,
        timeline: false,
        fullscreenButton:false,
        animation: false,
        scene3DOnly: true,
        msaaSamples: 4,
        zoom : initZoom,
        contextOptions:{
            requestWebgl2: true
        }
    });

    // Shadows
    viewerCS.terrainProvider.castShadows = true;
    viewerCS.terrainProvider.receiveShadows = true;

    // Avoid camera under terrain
    const controller = viewerCS.scene.screenSpaceCameraController;
    controller.enableCollisionDetection = true;
    controller.minimumZoomDistance = 1;

    viewerCS.camera.frustum.fov = Cesium.Math.toRadians(80);
    viewerCS.scene.globe.depthTestAgainstTerrain = true;

    addTerrain(viewerCS)
    addBasemap(viewerCS)
    addBuildings(viewerCS)
    addVegetation(viewerCS)

    sceneProfiles.forEach(asset => {
        addAsset(viewerCS, asset)
    });
    
    return viewerCS
}

function addBasemap (viewer) {
    // Basemap
    const basemapURL = '//wmts100.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-karte-farbe.3d/default/current/3857/{z}/{x}/{y}.jpeg'
    // 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    // 'https://a.tile.openstreetmap.org/'
    //'//wmts100.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-karte-farbe.3d/default/current/3857/{z}/{x}/{y}.jpeg'

    viewer.scene.imageryLayers.removeAll();

    const basemap = new Cesium.UrlTemplateImageryProvider({
        url : basemapURL,
        credit: 'Basemap courtesy of CartoDB'
    })
    viewer.scene.imageryLayers.addImageryProvider(basemap);
}

function addTerrain (viewer) {
    // Terrain
    const terrainURL = "//3d.geo.admin.ch/1.0.0/ch.swisstopo.terrain.3d/default/20160115/4326/"

    const terrain = new Cesium.CesiumTerrainProvider({
        url : terrainURL,
        credit: 'Terrain courtesy of SwissTopo'
    });
    viewer.terrainProvider = terrain;
}

function addBuildings (viewer) {
    // Buildings
    const buildingsURL = '//vectortiles0.geo.admin.ch/3d-tiles/ch.swisstopo.swisstlm3d.3d/20201020/tileset.json'

    const buildings = new Cesium.Cesium3DTileset({
        url : buildingsURL,
        credit: 'Buildings courtesy of SwissTopo'
    });
    buildings.style = new Cesium.Cesium3DTileStyle({
        // delete one building on the experience site
        show : '${UUID} !== "3D2ACA5D-3A3C-46EE-8463-2820B253E2CE"',
    });
    viewer.scene.primitives.add(buildings);
}

function addVegetation (viewer) {
    // Vegetation
    const vegetationURL = '//vectortiles100.geo.admin.ch/3d-tiles/ch.swisstopo.vegetation.3d/20190313/tileset.json'

    const vegetation = new Cesium.Cesium3DTileset({
        url : vegetationURL,
        credit: 'Vegetation courtesy of SwissTopo'
    });
    viewer.scene.primitives.add(vegetation);
}

async function addAsset (viewer, asset){
    let loadedAsset = await Cesium.IonResource.fromAssetId(asset.id)   
    let assetPosition = Cesium.Cartesian3.fromDegrees(asset.lat, asset.lon, asset.alt)
    await Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, assetPosition);
    let hpr = new Cesium.HeadingPitchRoll(asset.heading, 0/*pitch*/ , 0/*roll*/);
    let orientation = Cesium.Transforms.headingPitchRollQuaternion(
        assetPosition,
        hpr
    );
    viewer.entities.add({
        position: assetPosition,
        orientation:orientation,
        model: { 
            uri: loadedAsset,
            heightReference: (asset.alt > 0) ? Cesium.HeightReference.NONE : Cesium.HeightReference.CLAMP_TO_GROUND,
            material : Cesium.Color.WHITE,
            show: true,
            scale: asset.scale
            
        },
        name:i18n.global.t(`model-description.${asset.name}.title`),
        description:i18n.global.t(`model-description.${asset.name}.description`)
    }); 
}

export function isInSwitzerland(viewer, lat, lon){
    // Check if the point is in Switzerland bounding box 
    if (!(lat < 47.869910020393519 && lat > 45.659168946713827 && lon > 5.8358140744676303 && lon < 10.979311848153316)) {
        // ADD default value of parameters: OSM builgings + cesium terrain + OSM basemap
        viewer.scene.imageryLayers.removeAll();
        const osmbasemap = new Cesium.OpenStreetMapImageryProvider({
            url : 'https://a.tile.openstreetmap.org/'
        })
        const cesiumterrainProvider = Cesium.createWorldTerrain()
        viewer.terrainProvider = cesiumterrainProvider;
        viewer.scene.imageryLayers.addImageryProvider(osmbasemap);
        viewer.scene.primitives.add(Cesium.createOsmBuildings());
    }
}
