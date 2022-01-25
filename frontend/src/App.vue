<template>
<div id="app" :data-token=token>
  <Header/>
  <div id="content">
    <router-view/>
  </div>
</div>
</template>
<script>
import Header from './components/Header.vue'

export default {
  name: '',
  data() {
    return {
    }
  },
  components:{
    Header
  },
  methods:{
  },
  computed:{
    token(){
      return this.$store.state.accessToken;
    }
  }

}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

#getToken{
  display: none;
}

html, body {
  font-family: 'Roboto', sans-serif;
  background-color: #000000;
  background-image: linear-gradient(315deg, #000000 0%, #414141 74%);

}

#app {
  font-family: 'Roboto', sans-serif;
}
#app {
  font-family: 'Roboto', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
#content{
  margin: 50px 20px;
  
}

@media screen and (min-width: 1200px) {
  #content {
    margin: 50px auto;
    max-width: 1070px;
  }
}
  
</style>
