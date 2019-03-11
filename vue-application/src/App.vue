<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
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

.title h2 {
  text-align: center;
}
.title h2::after {
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
</style>
