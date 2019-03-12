<template>
  <div>
    <app-header/>
    <cars-table/>
    <car-modal v-if="CARS_MODAL_OPTIONS.opened"/>
    <notification-snackbar v-if="SNACKBAR_OPTIONS.visible"/>
  </div>
</template>

<script>
import CarsTable from "../components/CarsTable/CarsTable.vue";
import AppHeader from "../components/AppHeader.vue";
import CarModal from "../components/CarModal.vue";
import NotificationSnackbar from "../components/NotificationSnackbar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
    AppHeader,
    CarsTable,
    CarModal,
    NotificationSnackbar
  },
  computed: {
    ...mapGetters(["CARS_MODAL_OPTIONS", "SNACKBAR_OPTIONS"])
  }
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background: #fff;
  width: 100vw;
  overflow-x: hidden;

  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body.modal-opened {
  overflow: hidden;
}

h2,
label {
  color: #212529;
}

button,
select {
  cursor: pointer;
}

button,
select {
  border: 1px solid #ced4da;
  background: #fff;
  border-radius: 3px;
  min-width: 100px;
  min-height: 24px;
  padding: 4px;
  font-weight: bold;
  transition: all 0.3s;
  margin: 0 2px;
}

button[disabled] {
  cursor: initial;
}

button[disabled]:hover {
  background-color: #fff;
}

button:hover {
  background-color: rgb(224, 224, 224);
}

button.primary {
  background-color: #2daee0 !important;
  border-color: #2daee0 !important;
  color: #fff;
  transition: all 0.4s;
}

button.primary:hover {
  background: #2dade0d7 !important;
}

button.outline-primary {
  background-color: #fff !important;
  border-color: #2daee0 !important;
  color: #212529;
  transition: all 0.4s;
}
button.outline-primary:hover {
  background-color: #2daee0 !important;
  color: #fff;
}

input {
  border: 1px solid #ced4da;
  background: #fff;
  border-radius: 3px;
  min-width: 100px;
  min-height: 24px;
  padding: 4px;
}

select,
textarea,
button,
input {
  margin: 2px 2px 2px 2px;
  border: 1px solid #ced4da;
  background: #fff;
  border-radius: 3px;
  min-width: 100px;
  min-height: 24px;
  padding: 4px;
}

.container {
  margin: 0 50px;
}
</style>
