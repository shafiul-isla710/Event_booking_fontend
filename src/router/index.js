import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MemberRegistration from '../views/MemberRegistration.vue'
import LoginPage from '../views/LoginPage.vue'
import MemberDashboard from "@/views/MemberDashboard.vue";
import MemberEventConfirm from "@/views/MemberEventConfirm.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:HomePage
    },
    {
      path:"/registration",
      name: 'registration',
      component:MemberRegistration
    },
    {
      path:"/login",
      name: 'login',
      component:LoginPage
    },
    {
      path:'/member-dashboard',
      name: 'member_dashboard',
      component:MemberDashboard
    },
    {
      path:'/member-event-confirm',
      name: 'member_event-confirm',
      component:MemberEventConfirm
    },

  ],
})

export default router
