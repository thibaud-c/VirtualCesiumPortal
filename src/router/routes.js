import VCesium from '@/views/ViewCesium.vue'
import Home from '@/views/Home.vue'
import VNotfound from '@/views/404page.vue'

const routes = [
 
  {
    path: "",
    name: "Home",
    component: Home,
  },
  {
    path: "/cesium",
    name: "Cesium",
    component: VCesium,
  }, 
  {
    path: "/:catchAll(.*)",
    name: "404 page",
    component: VNotfound,
  }
];

export default routes