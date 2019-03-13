<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form class="car-form">
            <h2 class="title">Add new car</h2>

            <div class="form-group">
              <label for="bodyTypeName">Body type:</label>
              <div class="form-group__input-wrapper">
                <select v-model="body_type_id" id="bodyTypeName" required>
                  <option value="1">Convertible</option>
                  <option value="2">Coupe</option>
                  <option value="3">Sedan</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="makeName">Make:</label>
              <div class="form-group__input-wrapper">
                <select v-model="make_id" id="makeName" required>
                  <option value="1">Kirlin-Stracke</option>
                  <option value="2">Muller, Goldner and Champlin</option>
                  <option value="3">Denesik Inc</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="carModel">Model:</label>
              <div class="form-group__input-wrapper">
                <select v-model="car_model_id" id="carModel" required>
                  <option value="1">Ohara</option>
                  <option value="2">Osinski</option>
                  <option value="7">Lang</option>
                  <option value="12">Stracke</option>
                  <option value="55">Wisoky</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="year">Year:</label>
              <div class="form-group__input-wrapper">
                <input v-model="year" type="number" min="1900" required>
              </div>
            </div>

            <div class="form-group">
              <label for="mileage">Mileage:</label>
              <div class="form-group__input-wrapper">
                <input type="number" v-model="mileage" id="mileage" required>
              </div>
            </div>

            <div class="form-group">
              <label for="carDescription">Description:</label>
            </div>

            <div class="form-group">
              <div class="form-group__input-wrapper">
                <textarea
                  v-model="description"
                  id="carDescription"
                  cols="40"
                  rows="10"
                  placeholder="Enter the car's description..."
                  required
                ></textarea>
              </div>
            </div>

            <div class="form-group car-form__btns form__btns">
              <button
                v-if="!CARS_MODAL_OPTIONS.data"
                class="primary"
                type="button"
                @click="createCar"
              >Create</button>
              
              <button
                v-if="CARS_MODAL_OPTIONS.data"
                class="edit"
                type="button"
                @click="updateCar"
              >Update</button>
              
              <button
                v-if="CARS_MODAL_OPTIONS.data"
                class="delete"
                type="button"
                @click="deleteCar"
              >Delete</button>
              
              <button class="modal-default-button" type="button" @click="closeModal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: { ...mapGetters(["CARS_MODAL_OPTIONS"]) },
  data() {
    return {
      body_type_id: null,
      make_id: null,
      car_model_id: null,
      year: null,
      mileage: null,
      description: null
    };
  },
  methods: {
    ...mapActions([
      "CHANGE_CARS_MODAL_OPTIONS",
      "CREATE_CAR",
      "DELETE_CAR",
      "UPDATE_CAR"
    ]),

    closeModal() {
      this.CHANGE_CARS_MODAL_OPTIONS({
        opened: false,
        data: null
      });
    },
    createCar() {
      this.CREATE_CAR({
        body_type_id: this.body_type_id,
        make_id: this.make_id,
        car_model_id: this.car_model_id,
        year: this.year,
        mileage: this.mileage,
        description: this.description
      });

      this.closeModal();
    },

    deleteCar() {
      this.DELETE_CAR(this.CARS_MODAL_OPTIONS.data.id);
      this.closeModal();
    },

    updateCar() {
      this.UPDATE_CAR({
        id: this.CARS_MODAL_OPTIONS.data.id,
        body_type_id: this.body_type_id,
        make_id: this.make_id,
        car_model_id: this.car_model_id,
        year: this.year,
        mileage: this.mileage,
        description: this.description
      });
      this.closeModal();
    }
  },
  mounted() {
    if (this.CARS_MODAL_OPTIONS.data) {
      this.body_type_id = this.CARS_MODAL_OPTIONS.data.body_type_id;
      this.make_id = this.CARS_MODAL_OPTIONS.data.make_id;
      this.car_model_id = this.CARS_MODAL_OPTIONS.data.car_model_id;
      this.year = this.CARS_MODAL_OPTIONS.data.year;
      this.mileage = this.CARS_MODAL_OPTIONS.data.mileage;
      this.description = this.CARS_MODAL_OPTIONS.data.description;
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

textarea {
  width: 100%;
  margin-top: 10px;
}

button.delete {
  background-color: #c82333;
  border-color: #bd2130;
  color: #fff;
}

button.delete:hover {
  background-color: #b82030;
}

button.edit {
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
}

button.edit:hover {
  background-color: #f7b900;
}
</style>
