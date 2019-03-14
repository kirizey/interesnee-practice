<template>
  <thead>
    <tr class="table-titles">
      <th :key="type.name" v-for="type in sortTypes">
        <div class="title-container">
          {{type.name}}
          <div class="sort-arrows">
            <i
              @click="()=> selectSort(type.sName, 'asc')"
              :class="{active:type.sName===selectedFilter.sName &&selectedFilter.order==='asc'}"
              class="fas fa-arrow-alt-circle-up"
            ></i>
            <i
              @click="()=> selectSort(type.sName, 'desc')"
              :class="{active:type.sName===selectedFilter.sName &&selectedFilter.order==='desc'}"
              class="fas fa-arrow-alt-circle-down"
            ></i>
          </div>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      sortTypes: [
        { name: "Producer", sName: "make.name" },
        { name: "Model", sName: "car_model.name" },
        { name: "Body type", sName: "body_type.name" },
        { name: "Year", sName: "year" },
        { name: "Mileage", sName: "mileage" },
        { name: "Description", sName: "description" },
        { name: "Created", sName: "created_at" },
        { name: "Updated", sName: "updated_at" }
      ],
      selectedFilter: {
        sName: "",
        order: ""
      }
    };
  },
  methods: {
    /**
     * Get action method from store
     */
    ...mapActions(["GET_CARS"]),

    /**
     * Sort all of data in oreder and field of selected filter
     */
    selectSort(sName, sortOrder) {
      this.selectedFilter = {
        sName: sName,
        order: sortOrder
      };

      this.GET_CARS({
        page: 1,
        keyword: this.QUERY_DATA.keyword,
        orderBy: sName,
        sortOrder: sortOrder
      });
    }
  },
  computed: {
    /**
     * Get request options for "GET" requests
     */
    ...mapGetters(["QUERY_DATA"])
  }
};
</script>

<style scoped>
.table-titles th {
  font-weight: bold;
  min-width: 130px;
  height: 40px;
}

.title-container {
  display: flex;
  justify-content: center;
}

.sort-arrows {
  margin-left: 5px;
}

i {
  margin: 0 2px;
  cursor: pointer;
}

.active {
  color: #2daee0;
}
</style>
