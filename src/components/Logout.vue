<template>
  <RouterLink to="#" @click.prevent="logout">Выход</RouterLink>
</template>


<script>
import axiosInstance from '@/config/axios-config.js'
import {API_BASE_URL} from "@/config/constants";
import {RouterLink} from "vue-router";

export default {
  components: {RouterLink},
  methods: {
    async logout() {
      try {
        const response = await axiosInstance.post(`${API_BASE_URL}/api/user-mgmt/logout`, {}, {
          headers: {
            Authorization: this.$store.getters.authHeader,
          },
        });
        this.$store.dispatch('logout');
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  },
}
</script>
