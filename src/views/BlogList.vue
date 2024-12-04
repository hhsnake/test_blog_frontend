<template>
  <div>
    <h1>Blog List</h1>
    <BlogTable></BlogTable>
  </div>
</template>

<script>
import BlogTable from "@/components/BlogTable.vue";

export default {
  components: {BlogTable},
  data() {
    return {
    }
  },
}
</script>
