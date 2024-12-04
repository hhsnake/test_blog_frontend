<template>
  <div>
    <h1>Восстановить пароль</h1>
    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="restore-message" v-if="restoreMessage">{{ restoreMessage }}</p>
    <form @submit.prevent="restore">
      <input v-model="email" type="email" placeholder="Email" required />
      <button type="submit">Восстановить пароль</button>
    </form>
    <div>
      <RouterLink to="/login">Войти</RouterLink>
      <span>&nbsp;</span>
      <RouterLink to="/register">Зарегистрироваться</RouterLink>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {API_BASE_URL} from "@/config/constants";
import {RouterLink} from "vue-router";

export default {
  components: {RouterLink},
  data() {
    return {
      email: '',
      errorMessage: null,
      restoreMessage: null
    }
  },
  methods: {
    async restore() {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/user-auth/restore`, {
          email: this.email
        });
        this.restoreMessage = response.data;
      } catch (error) {
        if (error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else if (error.response) {
          this.errorMessage = error.response.statusText;
        } else {
          this.errorMessage = error.message;
        }
        console.error('Restore failed:', error);
      }
    },
  },
}
</script>
