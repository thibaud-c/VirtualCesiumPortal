export async function updateCesiumPosition(viewer, lat, lon){
  //Update position
  let globeHeight = await getHeightfromPosition(viewer, lat, lon)
  if (isNaN(globeHeight)) {globeHeight = 500} // default height value
  const userPositionCS  = Cesium.Cartesian3.fromDegrees(lon, lat, globeHeight)
  flytoView(viewer, userPositionCS)
}

async function getHeightfromPosition(viewer, lat, lon){
  const position = Cesium.Cartographic.fromDegrees(lon, lat);
  await Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, position);
  return viewer.scene.globe.getHeight(Cesium.Cartographic.fromDegrees(lon, lat))+2 // add 2 for human height
}

/**
 * Fly to position - keep the gaza at the same place
 * 
 * @param {number[]} globecenter position to fly to
 * @param {number} globeheight altitude
 * @param {number[]} orientation orientation camera
 * @param {Viewer} viewer cesium viewer
 */
function flytoView(viewer, position){
  viewer.camera.flyTo({
    destination : position,
    orientation : {
        heading : viewer.camera.heading,
        pitch : viewer.camera.pitch,
        roll : viewer.camera.roll
    },
    duration:0.
  });
}

/**
 * Look at -> change the gaze of the camera
 * 
 * @param {number[]} orientation orientation camera
 * @param {Viewer} viewer cesium viewer
 */
export function updateCesiumOrientation(viewer, pan, tilt){
  viewer.camera.setView({
    orientation : {
        heading : Cesium.Math.toRadians(pan),
        pitch : Cesium.Math.toRadians(tilt),
        roll : 0.0
    },
    duration:0.
  });
}