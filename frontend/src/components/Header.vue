<template>
  <div>
    <nav id="nav">
      <header>
        <nav class="navbar">
          <router-link to="/">
          <div class="logo">
            <h1>Hardware-Wecker</h1>
          </div>
          </router-link>
          <div class="flex ">

            <va-button v-if="isLoggedIn" @click="showAlarm =! showAlarm" class="headerBtns" icon="alarm"> + Preiswecker</va-button>

            <router-link v-if="isLoggedIn" to="/profile" class="profile">
<<<<<<< HEAD
              <va-button class="headerBtns" icon="person">Deine Wecker</va-button>
=======
              <va-button class="headerBtns" icon="person">Profile</va-button>
>>>>>>> 9e543abec83e23b025cd6f6e8b3400bb28733b6d
            </router-link>

            <va-button  v-if="!isLoggedIn" outline class="headerBtns" @click="showLogin = !showLogin"> Login </va-button>
            <va-button v-if="isLoggedIn"  class="headerBtns" @click="logout"> Logout </va-button>

            <va-button v-if="!isLoggedIn" class="headerBtns" @click="showRegister = !showRegister"> Register </va-button>

            

            <va-modal size="large" v-model="showLogin" title="Login" hide-default-actions>
              <template v-slot:default>
                <Login  v-on:close="showLogin = false" :isMobile="isMobile"/>
              </template>
            </va-modal>

            <va-modal v-model="showRegister" title="Register" hide-default-actions>
              <template v-slot:default>
                <Register v-on:close="showRegister = false" :isMobile="isMobile"/>
              </template>
            </va-modal>

            <va-modal fullscreen v-model="showAlarm" title="Neuen Preiswecker anlegen" hide-default-actions>

                <NewAlarm v-on:close="showAlarm = false" :isMobile="isMobile"/>

            </va-modal>

          </div>
        </nav>
      </header>
    </nav>

  </div>
</template>

<script>
import Login from './Login.vue';
import Register from './Register.vue';
import NewAlarm from './NewAlarm.vue';


  export default {
    name: 'Header',
    mounted() { 

    },
    data() {
      return {
        showLogin: false,
        showRegister: false,
        showAlarm: false,
      }
    },
    components: {
      Login,
      Register,
      NewAlarm,
      
    },
    methods:{
      logout(){
        this.$store.dispatch('logout')
      }
    },
    computed: {
      isMobile() {
        console.log(window.innerWidth)
        if( window.innerWidth <= 768 ) {
            return true;
        }
        else {
            return false;
        }
      },
    isLoggedIn(){
      return this.$store.state.loggedIn;
    }
    },

  }
</script>


<style>

a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  color:#ffffff;
}

.links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}
.headerBtns{
  width: 200px;
}

.navbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;

  padding: 25px;
  /* border-radius: 2px;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75); */
}

/* Desktop */
@media screen and (min-width: 768px) {
.links {
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.navbar{
  flex-direction: row;
  justify-content: space-between;

}
.headerBtns{
  width: auto;
  margin: 0px 5px !important;
}
.va-modal__inner{
  width: 500px !important;
  
}
}

/* Mobile */
@media screen and (max-width: 768px) {
.va-modal--mobile-fullscreen {
  position: static !important;
  display:flex;
  flex-direction: column;
}
.headerBtns{
  margin-top: 10px !important;
}
}
.va-modal__dialog, va-modal--mobile-fullscreen, .va-modal--size-large{
  background-color: #868585 !important;
  background-color: #3D3D3D !important;
}
.va-modal__dialog, va-modal--mobile-fullscreen, .va-modal--size-large{
  background-color: #868585 !important;
  background-color: #3D3D3D !important;
}
</style>