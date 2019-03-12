<template>
  <tbody class="cars-list__body">
    <tr v-bind:key="car.id" v-for="car in CARS">
      <th>{{car.make.name}}</th>
      <th>{{car.car_model.name}}</th>
      <th>{{car.body_type.name}}</th>
      <th>{{car.year}}</th>
      <th>{{car.mileage}}</th>
      <th>{{car.description}}</th>
      <th>{{car.created_at}}</th>
      <th>{{car.updated_at}}</th>
    </tr>
  </tbody>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["CARS"])
  }
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
