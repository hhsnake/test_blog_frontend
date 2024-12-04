<template>
  <div class="pagination">
    <button
      :disabled="page <= 1"
      @click="$emit('update-page', page - 1)"
    >
      Предыдущая
    </button>
    <span>Страница {{ page }} из {{ totalPages }}</span>
    <button
      :disabled="page >= totalPages"
      @click="$emit('update-page', page + 1)"
    >
      Следующая
    </button>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['updatePage']
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  outline: none;
  border: none;
}

.pagination button:hover {
  background-color: #e0e0e0;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>