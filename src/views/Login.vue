<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter, RouterLink } from 'vue-router';
import {API_BASE_URL} from "@/config/constants"; // config.js находится в папке src

const store = useStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const errorMessage = ref(null);

const login = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user-auth/get-token`, {
      username: username.value,
      password: password.value,
    });
    const token = response.data.data.token;
    store.dispatch('saveToken', token);
    router.push('/blogs');
  } catch (error) {
    if (error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else if (error.response) {
      errorMessage.value = error.response.statusText;
    } else {
      errorMessage.value = error.message;
    }
    console.error('Login failed:', error);
  }
};
</script>

<template>
  <div class="login-container">

      <h1>Вход</h1>
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      <form @submit.prevent="login">
        <div>
          <input v-model="username" type="text" placeholder="Username" required class="form-control" />
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Password" required class="form-control" />
        </div>
        <button type="submit">Войти</button>
      </form>
      <div>
        <RouterLink to="/register">Зарегистрироваться</RouterLink>
        <span>&nbsp;</span>
        <RouterLink to="/restore">Восстановить пароль</RouterLink>
      </div>

  </div>
</template>

<style scoped>

.login-container {
  margin: auto;
  width: 90%;
  max-width: 450px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  align-self: center;
}

.form-control {
  width: 100%;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}
</style>
