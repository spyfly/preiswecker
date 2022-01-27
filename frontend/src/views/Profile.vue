<template>
  <div class="container">
    <h2> Deine Preiswecker </h2>
    <div v-if="$store.state.alerts.length != 0" class="preiswecker">

    <div class="card" v-for="(alert,idx) in $store.state.alerts" :key="alert._id">
      <va-card stripe :stripe-color="colors[idx % colors.length]">
        <va-card-title>{{ alert.name }}</va-card-title>
        <va-card-content>
          <span id="reachedPriceText"> Aktueller Preis</span><br>
          <span id="reachedPrice">{{alert.reachedPrice}} €</span>
          <br>
          <span id="targetPrice"> Wunschpreis: {{alert.targetPrice}} €</span>
        </va-card-content>
        <va-divider />
        <va-card-actions align="between">
          <va-button flat icon="create" class="mr-4" @click="editAlert(alert)"><span class="actionText">Edit</span></va-button>
          <va-button flat icon="clear" class="mr-4" @click="deleteAlert(alert._id)"><span class="actionText">Clear</span></va-button>
        </va-card-actions>
      </va-card>
    </div>

    </div>
    <div class="noAlerts" v-else>
      <p>Du hast noch keine Preiswecker angelegt.</p>
    </div>

    <va-modal fullscreen v-model="showAlarm" title="Neuen Preiswecker anlegen" hide-default-actions>

        <NewAlarm v-on:close="showAlarm = false" :isEdit="true" :oldAlarm="oldAlarm" :isMobile="isMobile"/>

    </va-modal>
  </div>
</template>

<script>
import NewAlarm from '@/components/NewAlarm.vue'
export default {
  name: 'Profile',
  components:{
    NewAlarm
  },
  data() {
    return {
      showAlarm: false,
      oldAlarm: null,
      colors:[
        '#A3D39C',
        '#EFA8B8',
        '#BAABBD',
        '#D68FD6',
        '#4392F1',
        '#FA9F42',
        '#F44708',
        '#FAA613'
      ]
    }
  },
  async created() {
    this.alerts = await this.$store.dispatch('fetchAllAlerts');
    if(this.alerts.msg) this.$store.commit('setAlerts', []);
  },
  methods:{
    async deleteAlert(id){
      await this.$store.dispatch('deleteAlert', id).then(async (resp) => {
        if(resp){
          this.alerts = await this.$store.dispatch('fetchAllAlerts');
          if(this.alerts.msg) this.$store.commit('setAlerts', []);
        }
        else{
          console.log('Error');
        }
      });
    },
  editAlert(alert){
    this.oldAlarm = alert;
    this.showAlarm = true;
  }
}
}
</script>


<style scoped>
h1{
  font-size: 200%;
  margin: 20px;
}
h2{
  font-size: 150%;
  margin: 20px;
}
.preiswecker{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}



.card{
  margin: 10px;
  width: 100%;
}
.actionText{
  
}
#reachedPrice{
  font-size: 120%;
  font-weight: bold;
  margin: 10px;
  display:inline-block;
}
#reachedPriceText{
  font-size: 120%;
  font-weight: bold;
}
.noAlerts{
  margin: 20px;
}
@media screen and (min-width: 768px) {
.card{
  margin: 10px;
  width: 30%;
}
}

</style>
