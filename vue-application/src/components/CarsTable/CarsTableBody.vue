<template>
  <tbody class="cars-list__body">
    <tr :key="car.id" v-for="car in CARS">
      <th @click="() => openUpdateCarModal(car)">{{car.make.name}}</th>
      <th @click="() => openUpdateCarModal(car)">{{car.car_model.name}}</th>
      <th @click="() => openUpdateCarModal(car)">{{car.body_type.name}}</th>
      <th>{{car.year}}</th>
      <th>{{car.mileage}}</th>
      <th>{{car.description}}</th>
      <th>{{car.created_at}}</th>
      <th>{{car.updated_at}}</th>
    </tr>
  </tbody>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    /**
     * Get state values form store
     */
    ...mapGetters(["CARS", "CARS_MODAL_OPTIONS"])
  },
  methods: {
    /**
     * Get action method from store
     */
    ...mapActions(["CHANGE_CARS_MODAL_OPTIONS"]),

    /**
     * Open modal for selected car and fill it by sent data
     */
    openUpdateCarModal(car) {
      this.CHANGE_CARS_MODAL_OPTIONS({ opened: true, data: car });
    }
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
