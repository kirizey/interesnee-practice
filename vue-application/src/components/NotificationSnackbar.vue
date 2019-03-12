<template>
  <div class="notification-snackbar">{{SNACKBAR_OPTIONS.message}}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NotificationSnackbar",
  computed: {
    ...mapGetters(["SNACKBAR_OPTIONS"])
  }
};
</script>

<style scoped>
.notification-snackbar {
  font-size: 20px;
  position: absolute;
  text-align: center;
  margin: 0 0 20px 30px;
  bottom: 0;
  padding: 15px;
  background-color: rgba(50, 50, 50, 0.877);
  box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 6px 0px;
  color: aliceblue;
  border-radius: 7px;
  animation: slide-up 0.3s ease-in-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
