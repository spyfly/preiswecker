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
              <va-button class="headerBtns" icon="person">Deine Wecker</va-button>
            </router-link>

            <va-button  v-if="!isLoggedIn" outline class="headerBtns" @click="showLogin = !showLogin"> Login </va-button>
            <va-button v-if="isLoggedIn"  class="headerBtns" @click="logout"> Logout </va-button>

            <va-button v-if="!isLoggedIn" class="headerBtns" @click="showRegister = !showRegister"> Register </va-button>

            <va-button  class="headerBtns vectorBtn" @click="toTampermonkey">
              <svg version="1.1" viewBox="0 0 250.67 250.67" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><title>tampermonkey_icon</title><metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title>tampermonkey_icon</dc:title><cc:license rdf:resource="https://www.gnu.org/licenses/gpl-3.0.html"/><dc:date>2016-05-26</dc:date><dc:creator><cc:Agent><dc:title>derjanb (https://github.com/derjanb)</dc:title></cc:Agent></dc:creator><dc:rights><cc:Agent><dc:title>https://www.gnu.org/licenses/gpl-3.0.html</dc:title></cc:Agent></dc:rights><dc:publisher><cc:Agent><dc:title>Marti Martz (https://github.com/Martii)</dc:title></cc:Agent></dc:publisher><dc:source>https://github.com/Tampermonkey/tampermonkey/blob/fb31096869523ecdec3b4ae06fbf21678eddb565/images/icon128.png</dc:source></cc:Work></rdf:RDF></metadata><path d="m62.115 0c-34.412 0-62.115 27.703-62.115 62.115v126.44c0 34.412 27.703 62.115 62.115 62.115h126.44c34.412 0 62.115-27.703 62.115-62.115v-126.44c0-34.412-27.703-62.115-62.115-62.115zm4.6758 132.58a51.124 51.124 0 0 1 5.1035 0.25586 51.124 51.124 0 0 1 5.0527 0.76367 51.124 51.124 0 0 1 4.9512 1.2637 51.124 51.124 0 0 1 4.8008 1.7539 51.124 51.124 0 0 1 4.6016 2.2226 51.124 51.124 0 0 1 4.3574 2.6699 51.124 51.124 0 0 1 4.0684 3.0938 51.124 51.124 0 0 1 3.7383 3.4824 51.124 51.124 0 0 1 3.373 3.8398 51.124 51.124 0 0 1 2.9727 4.1562 51.124 51.124 0 0 1 2.543 4.4336 51.124 51.124 0 0 1 2.0879 4.6641 51.124 51.124 0 0 1 1.6113 4.8496 51.124 51.124 0 0 1 1.1192 4.9863 51.124 51.124 0 0 1 0.61523 5.0723 51.124 51.124 0 0 1 0.12891 3.6172 51.124 51.124 0 0 1-0.25586 5.1035 51.124 51.124 0 0 1-0.76368 5.0527 51.124 51.124 0 0 1-1.2656 4.9512 51.124 51.124 0 0 1-1.752 4.8008 51.124 51.124 0 0 1-2.2227 4.6016 51.124 51.124 0 0 1-2.6699 4.3574 51.124 51.124 0 0 1-3.0938 4.0684 51.124 51.124 0 0 1-3.4824 3.7383 51.124 51.124 0 0 1-3.8398 3.373 51.124 51.124 0 0 1-4.1562 2.9727 51.124 51.124 0 0 1-4.4336 2.543 51.124 51.124 0 0 1-4.6641 2.0879 51.124 51.124 0 0 1-4.8496 1.6113 51.124 51.124 0 0 1-4.9863 1.1191 51.124 51.124 0 0 1-5.0723 0.61523 51.124 51.124 0 0 1-3.6172 0.12695 51.124 51.124 0 0 1-5.1035-0.2539 51.124 51.124 0 0 1-5.0527-0.76367 51.124 51.124 0 0 1-4.9512-1.2656 51.124 51.124 0 0 1-4.8008-1.752 51.124 51.124 0 0 1-4.6016-2.2227 51.124 51.124 0 0 1-4.3574-2.6719 51.124 51.124 0 0 1-4.0684-3.0918 51.124 51.124 0 0 1-3.7383-3.4824 51.124 51.124 0 0 1-3.373-3.8398 51.124 51.124 0 0 1-2.9727-4.1563 51.124 51.124 0 0 1-2.543-4.4336 51.124 51.124 0 0 1-2.0879-4.6641 51.124 51.124 0 0 1-1.6113-4.8496 51.124 51.124 0 0 1-1.1191-4.9863 51.124 51.124 0 0 1-0.61523-5.0742 51.124 51.124 0 0 1-0.12891-3.6152 51.124 51.124 0 0 1 0.25586-5.1035 51.124 51.124 0 0 1 0.76367-5.0527 51.124 51.124 0 0 1 1.2637-4.9531 51.124 51.124 0 0 1 1.7539-4.7988 51.124 51.124 0 0 1 2.2227-4.6016 51.124 51.124 0 0 1 2.6699-4.3574 51.124 51.124 0 0 1 3.0938-4.0684 51.124 51.124 0 0 1 3.4824-3.7383 51.124 51.124 0 0 1 3.8398-3.373 51.124 51.124 0 0 1 4.1562-2.9726 51.124 51.124 0 0 1 4.4336-2.543 51.124 51.124 0 0 1 4.6641-2.0879 51.124 51.124 0 0 1 4.8496-1.6113 51.124 51.124 0 0 1 4.9863-1.1191 51.124 51.124 0 0 1 5.0723-0.61524 51.124 51.124 0 0 1 3.6172-0.1289zm117.54 0a51.124 51.124 0 0 1 5.1035 0.25586 51.124 51.124 0 0 1 5.0527 0.76367 51.124 51.124 0 0 1 4.9531 1.2637 51.124 51.124 0 0 1 4.7988 1.7539 51.124 51.124 0 0 1 4.6016 2.2226 51.124 51.124 0 0 1 4.3574 2.6699 51.124 51.124 0 0 1 4.0684 3.0938 51.124 51.124 0 0 1 3.7383 3.4824 51.124 51.124 0 0 1 3.373 3.8398 51.124 51.124 0 0 1 2.9727 4.1562 51.124 51.124 0 0 1 2.543 4.4336 51.124 51.124 0 0 1 2.0879 4.6641 51.124 51.124 0 0 1 1.6113 4.8496 51.124 51.124 0 0 1 1.1191 4.9863 51.124 51.124 0 0 1 0.61523 5.0723 51.124 51.124 0 0 1 0.12891 3.6172 51.124 51.124 0 0 1-0.25586 5.1035 51.124 51.124 0 0 1-0.76367 5.0527 51.124 51.124 0 0 1-1.2637 4.9512 51.124 51.124 0 0 1-1.7539 4.8008 51.124 51.124 0 0 1-2.2227 4.6016 51.124 51.124 0 0 1-2.6699 4.3574 51.124 51.124 0 0 1-3.0938 4.0684 51.124 51.124 0 0 1-3.4824 3.7383 51.124 51.124 0 0 1-3.8398 3.373 51.124 51.124 0 0 1-4.1563 2.9727 51.124 51.124 0 0 1-4.4336 2.543 51.124 51.124 0 0 1-4.6641 2.0879 51.124 51.124 0 0 1-4.8496 1.6113 51.124 51.124 0 0 1-4.9863 1.1191 51.124 51.124 0 0 1-5.0723 0.61523 51.124 51.124 0 0 1-3.6172 0.12695 51.124 51.124 0 0 1-5.1035-0.2539 51.124 51.124 0 0 1-5.0527-0.76367 51.124 51.124 0 0 1-4.9512-1.2656 51.124 51.124 0 0 1-4.8008-1.752 51.124 51.124 0 0 1-4.6016-2.2227 51.124 51.124 0 0 1-4.3574-2.6719 51.124 51.124 0 0 1-4.0684-3.0918 51.124 51.124 0 0 1-3.7383-3.4824 51.124 51.124 0 0 1-3.373-3.8398 51.124 51.124 0 0 1-2.9726-4.1563 51.124 51.124 0 0 1-2.543-4.4336 51.124 51.124 0 0 1-2.0879-4.6641 51.124 51.124 0 0 1-1.6113-4.8496 51.124 51.124 0 0 1-1.1191-4.9863 51.124 51.124 0 0 1-0.61524-5.0742 51.124 51.124 0 0 1-0.12695-3.6152 51.124 51.124 0 0 1 0.25391-5.1035 51.124 51.124 0 0 1 0.76367-5.0527 51.124 51.124 0 0 1 1.2656-4.9531 51.124 51.124 0 0 1 1.752-4.7988 51.124 51.124 0 0 1 2.2226-4.6016 51.124 51.124 0 0 1 2.6719-4.3574 51.124 51.124 0 0 1 3.0918-4.0684 51.124 51.124 0 0 1 3.4824-3.7383 51.124 51.124 0 0 1 3.8398-3.373 51.124 51.124 0 0 1 4.1562-2.9726 51.124 51.124 0 0 1 4.4336-2.543 51.124 51.124 0 0 1 4.6641-2.0879 51.124 51.124 0 0 1 4.8496-1.6113 51.124 51.124 0 0 1 4.9863-1.1191 51.124 51.124 0 0 1 5.0742-0.61524 51.124 51.124 0 0 1 3.6152-0.1289z" fill="#fff"/></svg>
                <span>Browser Extension</span>
            </va-button>

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
      },
      toTampermonkey(){
        window.open('https://' + window.location.host + '/static/preiswecker.user.js', '_blank');
      }
    },
    computed: {
      isMobile() {
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
.vectorBtn > span{
  padding: 20px;

}

svg{
  width: 20px;
  margin: 0 10px 0 0;
}
</style>