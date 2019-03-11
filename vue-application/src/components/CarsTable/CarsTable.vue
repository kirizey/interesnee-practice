<template>
  <main class="container">
    <CarsTablePaginator/>

    <table class="cars-list">
      <CarsTableHead/>
      <CarsTableBody/>
    </table>
  </main>
</template>

<script>
import CarsTableHead from "./CarsTableHead.vue";
import CarsTableBody from "./CarsTableBody.vue";
import CarsTablePaginator from "./CarsTablePaginator";

export default {
  name: "CarsTable",
  components: {
    CarsTableHead,
    CarsTableBody,
    CarsTablePaginator
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
