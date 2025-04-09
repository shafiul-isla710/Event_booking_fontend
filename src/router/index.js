import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MemberRegistration from '../views/MemberRegistration.vue'
import LoginPage from '../views/LoginPage.vue'
import MemberDashboard from "@/views/MemberDashboard.vue";
import MemberEventConfirm from "@/views/MemberEventConfirm.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import AdminProfile from "@/components/admin/AdminProfile.vue";
import Events from "@/components/admin/Events.vue";
import EventEdit from "@/components/admin/EventEdit.vue";
import memberBookings from "@/views/memberBookings.vue"
import EventBookings from "@/components/admin/EventBookings.vue";
import BookingUpdate from "@/components/admin/BookingUpdate.vue";


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
    {
      path:'/booking-table',
      name: 'booking-table',
      component:memberBookings
    },

    {
      path:'/admin',
      name:'admin',
      component:AdminDashboard,
      children:[
        {path:'admin-profile',component:AdminProfile},
        {path:'events',component:Events},
        {path:'bookings',component:EventBookings},
        {path:'event/edit/:id',component:EventEdit},
        {path:'booking/update/:bookingId',component:BookingUpdate},
      ]
    },

  ],
})

export default router
