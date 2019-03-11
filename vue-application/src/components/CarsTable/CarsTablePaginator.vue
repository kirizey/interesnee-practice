<template>
  <div class="paginator">
    <button id="prev-page-arrow" type="button">
      <i class="fas fa-angle-left"></i>
    </button>
    <div class="paginator__pages">
      <span class="pages__current"></span> /
      <span class="pages__total"></span>
    </div>
    <button id="next-page-arrow" type="button">
      <i class="fas fa-angle-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "CarsTablePaginator"
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
