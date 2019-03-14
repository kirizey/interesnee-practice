<template>
  <div>
    <notification-snackbar v-if="SNACKBAR_OPTIONS.visible"/>

    <router-view/>
  </div>
</template>

<script>
import NotificationSnackbar from "./components/NotificationSnackbar.vue";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    NotificationSnackbar
  },
  computed: {
    /**
     * Get snackbar options state for toggle it to show notofocations
     */
    ...mapGetters(["SNACKBAR_OPTIONS"])
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

.title {
  position: relative;
  margin-bottom: 30px;
}

h2.title {
  text-align: center;
}
h2.title::after {
  content: "";
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  width: 8%;
  background: #2daee0;
  height: 2px;
  bottom: -4px;
}

.form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
}

.form-group--error + .error {
  display: block;
  color: #f57f6c;
}
.error {
  font-size: 0.75rem;
  line-height: 1;
  text-align: right;
  display: none;
  margin-right: 27px;
  margin-bottom: 2px;
}
.form-group--error input,
.form-group--error textarea,
.form-group--error select,
.form-group--error input:focus,
.form-group--error input:hover {
  border-color: #f79483;
}

.form-group--error label {
  color: #f04124;
}
</style>
