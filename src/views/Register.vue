<template>
  <div>
    <h1>Регистрация нового пользователя</h1>
    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <form @submit.prevent="register">
      <div>
        <input v-model="username" type="text" placeholder="Username" required />
      </div>
      <div>
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <div>
        <button type="submit">Зарегистрировать</button>
      </div>
    </form>
    <div>
      <RouterLink to="/login">Войти</RouterLink>
      <span>&nbsp;</span>
      <RouterLink to="/restore">Восстановить пароль</RouterLink>
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
      username: '',
      email: '',
      password: '',
      errorMessage: null
    }
  },
  methods: {
    async register() {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/user-auth/register`, {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.$router.push('/login');
      } catch (error) {
        if (error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else if (error.response) {
          this.errorMessage = error.response.statusText;
        } else {
          this.errorMessage = error.message;
        }
        console.error('Register failed:', error);
      }
    },
  },
}
</script>
