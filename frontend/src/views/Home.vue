<template>
  <div class="container">
    <h1> Hardware-Wecker </h1>
    <div class="textBox">
      <p>
        <strong>Der Hardware-Wecker</strong> ist ein Service, der Preise von Computer-Hardware überwacht
        und dich informiert, wenn deine Wunsch-Hardware deinen Zielpreis erreicht!
      </p>
      <p>
        Dabei werden ganze Kategorien überwacht, die du durch Filter einschränken kannst.
      </p>

        </div>
      <h2>
        Wie funktioniert das?
      </h2>
      <ol class="list">
        <li style="display:list-item">
          Registriere dich auf unserer Seite und logge dich ein.
        </li>
        <li>
          Gehe auf Geizhals.de und konfiguriere deine Filter.
        </li>
        <li>
          Kopiere die URl 
        </li>
        <li>
          Klicke auf "Preiswecker" und lege einen neuen Wecker nach deinen Wünschen an.
        </li>
      </ol>
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
<style scoped>
h1{
  font-size: 200%;
}
h2{
  font-size: 150%;
}
p{
  margin: 0 0 10px 0;
}
.container {
  margin: 0 auto;
  display:flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
}
.textBox{
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 500px;
  flex:1;
}
ol {
  list-style-type: decimal;
  list-style-position: outside;
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 500px;
}
li{
  margin-bottom: 10px;
}

</style>
