<template>
  <div class="paginator">
    <button
      id="prev-page-arrow"
      type="button"
      :disabled="PAGINATION_DATA.current_page === 1"
      @click="goToPreviousPage"
    >
      <i class="fas fa-angle-left"></i>
    </button>
    <div class="paginator__pages">
      <span class="pages__current">{{PAGINATION_DATA.current_page}}</span> /
      <span class="pages__total">{{PAGINATION_DATA.total_pages}}</span>
    </div>
    <button
      id="next-page-arrow"
      type="button"
      :disabled="PAGINATION_DATA.current_page === PAGINATION_DATA.total_pages"
      @click="goToNextPage"
    >
      <i class="fas fa-angle-right"></i>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["PAGINATION_DATA", "QUERY_DATA"])
  },

  methods: {
    ...mapActions(["GET_CARS"]),

    goToNextPage() {
      this.GET_CARS({
        page: this.QUERY_DATA.page + 1,
        keyword: this.QUERY_DATA.keyword,
        orderBy: this.QUERY_DATA.orderBy,
        sortOrder: this.QUERY_DATA.sortOrder
      });
    },

    goToPreviousPage() {
      this.GET_CARS({
        page: this.QUERY_DATA.page - 1,
        keyword: this.QUERY_DATA.keyword,
        orderBy: this.QUERY_DATA.orderBy,
        sortOrder: this.QUERY_DATA.sortOrder
      });
    }
  }
};
</script>

<style scoped>
.paginator {
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
  float: right;
  margin: 5px 3px 5px 0;
}
</style>
