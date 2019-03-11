<template>
  <div class="authentication__wrap">
    <form class="authentication-form">
      <div class="title">
        <h2>Authorization</h2>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <div class="form-group__input-wrapper">
          <input type="email" id="email" name="email">
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <div class="form-group__input-wrapper">
          <input type="password" id="password" name="password">
        </div>
      </div>
      <div class="form-group form-btns">
        <button class="primary" type="button">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Authentication"
};
</script>

<style scoped>
.authentication__wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.02);
}
.authentication-form {
  border: 1px solid #2daee0;
  border-radius: 5px;
  width: 400px;
  margin: 0 auto;
  background: #fff;
  animation: slide-down 0.4s;
  position: relative;
  padding: 40px 20px 10px 20px;
}

.form-btns {
  justify-content: center;
}

button {
  margin-top: 30px;
  width: 100px;
}

h2 {
  margin-top: 0;
}
</style>
