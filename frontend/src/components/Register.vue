<template>
  <div>
    <va-form class="form">
        <va-input
          label="Username"
          v-model="username"
          :rules="[value => (value && value.length > 0) || 'Field is required']"
        />
        <va-input
          label="E-Mail"
          v-model="email"
          :rules="[value => (value && value.length > 0) || 'Field is required']"
        />
        <va-input
          label="Password"
          v-model="password"
          :rules="[value => (value && value.length > 0) || 'Field is required']"
          type="password"
        />

    <div class="errors text-center" v-if="errors.length > 0">
      <ul>
        <li v-for="(error, idx) in errors" v-bind:key="idx">{{ error }}</li>
      </ul>
    </div>
    <div class="btns text-center">
      <va-button
        class="registerBtn"
        @click="register()"
      >Register
      </va-button>
      <va-button
      v-if="isMobile"
        class="closeBtn"
        color="danger"
        @click="close()"
      >Close
      </va-button>
    </div>
      </va-form>



  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'Register',
  props: ["isMobile"],
  data() {
    return {
      password: '',
      email: '',
      username: '',
      errors: [],
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async register() {
      await this.$store.dispatch('register', {
        username: this.username,
        password: this.password,
        email: this.email,
      }).then((response) => {
        this.errors = [];
        if(response != true){
          response.map((error) => {
            this.errors.push(error.msg);
          });
        }
        else this.$emit("close");
      });
    }
  }
}
</script>


<style scoped>
.form{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.va-modal__inner{

}
.va-form{

}
.va-input{
  margin: 20px 0px;
  width:100%;
}
.va-message-list__message{
  margin: 20px 0px;
}
.errors{
  color: red;
  margin:  20px 0px;
}
.errors ul li{
  margin:  5px 0px;
}
.va-button{
  margin: 20px 0px;
  width: 80px;
}
.btns{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.closeBtn{
  background-color:darkgreen;
}

@media screen and (max-width: 560px) {
.va-input{
  margin: 20px 0px;
  width: 80vw !important;
}
}
</style>
