import cesiumPage from '../pages/CesiumPage.vue'
import landingPage from "../pages/LandingPage.vue"

const routes = [
 
  {
    path: "",
    name: "landingPage",
    component: landingPage,
  },
  {
    path: "/cesium",
    name: "Cesium",
    component: cesiumPage,
  }
];

export default routes