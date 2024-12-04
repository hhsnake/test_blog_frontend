<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Logout from "@/components/Logout.vue";
</script>

<template>
    <nav class="navbar navbar-fixed-top">
      <ul class="navbar-nav nav navbar-right">
        <li><Logout></Logout></li>
      </ul>
    </nav>
    <RouterView />
</template>

<style scoped>

.navbar {
  background-color: rgb(51 122 183);
  border-color: #ffffff;
}

.navbar-fixed-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-width: 0 0 1px;
  z-index: 999;
}

.nav {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.navbar-right {
  float: right !important;
  margin-right: -15px;
}

.navbar-nav {
    margin: 7.5px 30px;
}

.navbar-nav > li {
    float: left;
}

.nav > li {
    position: relative;
    display: block;
}
</style>
