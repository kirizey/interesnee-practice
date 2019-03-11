<template>
  <tbody class="cars-list__body"></tbody>
</template>

<script>
export default {
  name: "CarsTableBody"
};
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}

tbody tr:hover {
  background-color: rgb(224, 224, 224);
}
</style>
