<template>
  <div class="paginator">
    <button
      id="prev-page-arrow"
      type="button"
      :disabled="PAGINATION_DATA.current_page === 1"
      @click="() => goToPreviousPage(QUERY_DATA)"
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
      @click="() => goToNextPage(QUERY_DATA)"
    >
      <i class="fas fa-angle-right"></i>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["PAGINATION_DATA", "QUERY_DATA"])
  },

  methods: {
    goToNextPage(queryData) {
      console.log(queryData.page);
      this.$store.dispatch("CHANGE_QUERY_DATA", {
        page: queryData.page + 1,
        keyword: queryData.keyword,
        orderBy: queryData.orderBy,
        sortOrder: queryData.sortOrder
      });

      this.$store.dispatch("GET_CARS", {
        page: queryData.page + 1,
        keyword: queryData.keyword,
        orderBy: queryData.orderBy,
        sortOrder: queryData.sortOrder
      });
    },

    goToPreviousPage(queryData) {
      console.log(queryData.page);
      this.$store.dispatch("CHANGE_QUERY_DATA", {
        page: queryData.page - 1,
        keyword: queryData.keyword,
        orderBy: queryData.orderBy,
        sortOrder: queryData.sortOrder
      });

      this.$store.dispatch("GET_CARS", {
        page: queryData.page - 1,
        keyword: queryData.keyword,
        orderBy: queryData.orderBy,
        sortOrder: queryData.sortOrder
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
