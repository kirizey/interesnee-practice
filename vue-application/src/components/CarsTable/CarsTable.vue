<template>
  <main class="container">
    <cars-table-paginator/>

    <table class="cars-list">
      <cars-table-head/>
      <cars-table-body/>
    </table>
  </main>
</template>

<script>
import CarsTableHead from "./CarsTableHead.vue";
import CarsTableBody from "./CarsTableBody.vue";
import CarsTablePaginator from "./CarsTablePaginator";
import { mapActions } from "vuex";

export default {
  components: {
    CarsTableHead,
    CarsTableBody,
    CarsTablePaginator
  },
  mounted() {
    this.renderInitialData();
  },

  methods: {
    ...mapActions(["GET_CARS"]),

    renderInitialData() {
      this.GET_CARS({ page: 1 });
    }
  }
};
</script>

<style >
.cars-list {
  width: 100%;
  background-color: rgb(247, 247, 247);
  margin-bottom: 20px;
}

.cars-list th {
  padding: 5px;
  vertical-align: middle;
  border: 1px solid #dee2e6;
  font-weight: normal;
  font-size: 15px;
}
</style>
