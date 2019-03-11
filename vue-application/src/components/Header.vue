<template>
  <header>
    <div class="container header__items-wrap">
      <h2>CarsJS</h2>

      <div class="header__right-side">
        <button class="header__create-car-btn" type="button">Add car</button>
        <form @submit="search">
          <input type="search" placeholder="Type search query..." v-model="searchQuery">
        </form>

        <button class="primary" type="button">Logout</button>
      </div>
    </div>
  </header>
</template>


<script>
export default {
  name: "Header",
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    search(e) {
      e.preventDefault();
      this.$store.dispatch("search", this.searchQuery);
    }
  }
};
</script>

<style scoped>
header {
  background-color: rgb(50, 50, 50);
  box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 6px 0px;
  margin-bottom: 5px;
  width: 100vw;
  height: 50px;
}

h2 {
  color: #fff;
  font-weight: bold;
  font-size: 18px !important;
  margin: 0 !important;
}

.header__items-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 50px;
  height: 100%;
}

.header__right-side {
  display: flex;
}

.header__create-car-btn {
  background-color: #28a745;
  color: #fff;
  border: 1px solid #28a745;
}

.header__create-car-btn:hover {
  background-color: #2cb64c;
}
</style>
