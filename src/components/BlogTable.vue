<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Заголовок</th>
          <th>Автор</th>
          <th>Создано</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="blog in blogs" :key="blog.id">
          <td>{{ blog.id }}</td>
          <td>{{ blog.title }}</td>
          <td>{{ blog.author }}</td>
          <td>{{ blog.created_at }}</td>
        </tr>
      </tbody>
    </table>

    <Pagination2
      v-if="pagination.totalPages >= 1"
      :page="pagination.page"
      :total-pages="pagination.totalPages"
      @update-page="changePage"
    />

  </div>
</template>

<script>
import axiosInstance from '@/config/axios-config.js'
import {API_BASE_URL} from "@/config/constants";
import Pagination2 from "@/components/Pagination2.vue";

export default {
  components: {Pagination2},
  data() {
    return {
      blogs: [], // Данные для отображения в таблице
      pagination: {
        page: 1, // Текущая страница
        limit: 5, // Количество записей на странице
        totalPages: 0, // Общее количество страниц
      },
    };
  },
  methods: {
    async fetchBlogs() {
      try {
        const response = await axiosInstance.get(`${API_BASE_URL}/api/blog/list`, {
          params: {
            page: this.pagination.page,
            limit: this.pagination.limit,
          },
        });

        // Обновляем данные таблицы и пагинации
        this.blogs = response.data.blog;
        this.pagination.totalPages = response.data.pagination.totalPages;
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    },
    changePage(newPage) {
      this.pagination.page = newPage;
      this.fetchBlogs();
    },
  },
  mounted() {
    // Загружаем данные при инициализации компонента
    this.fetchBlogs();
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
}

</style>
