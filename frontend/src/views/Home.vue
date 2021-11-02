<template>
  <div>
    <h3> Geizhals link </h3>
    <div class="input-group mb-3">
      <input v-model="link" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
    <button @click="getData" class="btn btn-primary">Ok</button>

  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      link: "https://geizhals.de/api/gh0/categorylist/?cat=ramddr3&xf=&sort=r&hloc=at&hloc=de&hloc=eu&hloc=pl&hloc=uk&loc=de&lang=de&v=e&pagesize=100"
    }
  },
}
</script>
