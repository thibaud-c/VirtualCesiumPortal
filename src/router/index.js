import { createWebHistory, createRouter } from "vue-router";

import routes from './routes';

// Create Router
const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.VITE_BASE_URL,
  routes
});

export default router;