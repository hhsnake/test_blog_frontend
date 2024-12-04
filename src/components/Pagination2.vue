<template>
  <div class="pagination-container">
    <ul class="pagination">
      <li
        @click="firstPageClick"
        class="first"
      ><span
        :class="{ link: page > 1}"
      >1</span></li>
      <li
        @click="prevPageClick"
        class="prev"
      ><span
        :class="{ link: page > 1}"
      ><</span></li>
      <li
        @click="currentPageClick(i)"
        v-for="i in pagesToShow"
        :key="i"
      ><span
        :class="{ active: i === page, link: i !== page }"
      >{{ i }}</span></li>
      <li
        @click="nextPageClick"
        class="next"
      ><span
        :class="{ link: page < totalPages}"
      >></span></li>
      <li
        @click="lastPageClick"
        class="last"
      ><span
        :class="{ link: page < totalPages}"
      >{{ totalPages }}</span></li>
    </ul>
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
  emits: ['updatePage'],
  methods: {
    firstPageClick() {
      if (this.page <= 1) {
        return;
      }
      this.$emit('updatePage', 1);
    },
    prevPageClick() {
      if (this.page <= 1) {
        return;
      }
      this.$emit('updatePage', this.page - 1);
    },
    nextPageClick() {
      if (this.page >= this.totalPages) {
        return;
      }
      this.$emit('updatePage', this.page + 1);
    },
    lastPageClick() {
      if (this.page >= this.totalPages) {
        return;
      }
      this.$emit('updatePage', this.totalPages);
    },
    currentPageClick(i) {
      if (this.page === i) {
        return;
      }
      this.$emit('updatePage', i);
    }
  },
  computed: {
    pagesToShow() {
      const startPage = Math.max(this.page - 2, 1);
      let endPage = Math.min(this.page + 2, this.totalPages); // Ограничиваем максимум до totalPages
      const pages = [];

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }
  },
};
</script>

<style scoped>
.pagination-container {
  margin-top: 20px;
  text-align: center;
}

.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}

.pagination > li {
  display: inline;
}

.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}

.pagination > li > span.active, .pagination > li > span.active:hover {
  z-index: 3;
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}

.pagination > li > span:hover {
  z-index: 2;
  color: #23527c;
  cursor: default;
  background-color: #eeeeee;
  border-color: #ddd;
}

.pagination > li > span.link:hover {
  z-index: 2;
  color: #23527c;
  cursor: pointer;
  background-color: #eeeeee;
  border-color: #ddd;
}

</style>