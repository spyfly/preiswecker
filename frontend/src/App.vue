<template>
<div id="app">
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
  components:{
    Header
  },
  methods:{
    cb(){
      
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

html, body {
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: 'Roboto', sans-serif;
}
#app {
  font-family: 'Roboto', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
