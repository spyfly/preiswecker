<template>
  <div>
    <va-form class="form">
        <va-input
          label="Name des Weckers"
          v-model="name"
          :rules="[value => (value && value.length > 0) || 'Field is required']"
        />
        <va-input
          label="Geizhals-Link"
          placeholder="https://geizhals.de/?cat=cpuamdam4&xf=14840_6%7E14860_H.265%2FHEVC+encode%7E16686_Opteron+6000%7E16686_Ryzen+5000%7E4_140%7E590_boxed"
          v-model="link"
          :rules="[value => (value && value.length > 0) || 'Field is required']"
        />
        <va-input
          label="Zielpreis in €"
          placeholder="120"
          v-model="price"
          type="number"
          :rules="[value => (value && value.length > 0) || 'Field is required']"
        />

    <div v-if="response" class="response">
    <span class="respText">{{response}}</span>
    <div class="clockContainer">
        <div class="soundWave left">
            <div class="wave1"></div>
            <div class="wave2"></div>
            <div class="wave3"></div>
        </div>
        <div class="soundWave right">
            <div class="wave1"></div>
            <div class="wave2"></div>
            <div class="wave3"></div>
        </div>
        <div class="clockTop left"></div>
        <div class="clockTop right"></div>
        <div class="clockBell">
            <div class="bellArm"></div>
        </div>
        <div class='clockOut'>
            <div class="marker large twelvesix"></div>
            <div class="marker small oneseven"></div>
            <div class="marker small twoeight"></div>
            <div class="marker large threenine"></div>
            <div class="marker small fourten"></div>
            <div class="marker small fiveeleven"></div>
            <div class="clockMinuteNeedle"></div>
            <div class="clockSecondNeedle"></div>
        </div>
        <div class="clockLeg left"></div>
        <div class="clockLeg right"></div>
        </div>
    </div>

    <div class="errors text-center" v-if="errors.length > 0">
      <ul>
        <li v-for="(error, idx) in errors" v-bind:key="idx">{{ error }}</li>
      </ul>
    </div>
    <div class="btns text-center">
      <va-button
        v-if="isEdit"
        class="registerBtn"
        @click="sendEdit()"
      >
        Confirm
      </va-button>
      <va-button
        v-else
        class="registerBtn"
        @click="create()"
      >
        Create
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
export default {
  name: 'NewAlarm',
  props: [
    'isMobile',
    'isEdit',
    'oldAlarm',
  ],
  data () {
    return {
      link: '',
      name: '',
      price: '',
      response: '',
      errors: [],
    }
  },
  created(){
    console.log(this.oldAlarm)
    if(this.isEdit){
      console.log(this.oldAlarm)
      this.link = this.oldAlarm.filterUrl;
      this.name = this.oldAlarm.name;
      this.price = this.oldAlarm.targetPrice;
    }
  },
  methods: {
    close() {
      this.$emit("close")
    },
    async create(){
      await this.$store.dispatch('newAlert', {
        name: this.name,
        filterUrl: this.link,
        targetPrice: this.price,
      }).then((response) => {
        this.errors = [];
        if(response != true){
          response.map((error) => {
            this.errors.push(error.msg);
          });
        }
        else{
          this.response = "Wecker erfolgreich erstellt!";
          this.$store.dispatch('fetchAllAlerts');
          setTimeout(() => {
            this.$emit("close");
          }, 1000);
          }
      });
    },
    async sendEdit(){
      await this.$store.dispatch('editAlert', {
        targetPrice: this.price,
        id: this.oldAlarm._id,
        name: this.name,
        filterUrl: this.link,
      }).then((response) => {
        this.errors = [];
        if(response != true){
          response.map((error) => {
            this.errors.push(error.msg);
          });
        }
        else{
          this.response = "Wecker erfolgreich bearbeitet!";
          this.$store.dispatch('fetchAllAlerts');
          }
          setTimeout(() => {
            this.$emit("close");
          }, 1000);
      });
    },
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
.example{

  color: white;
  width:100%;
  text-decoration: underline;
  
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
.response{
  color: #A3D39C;
  margin: 20px 0px;
}
.respText {
  color: #A3D39C;
  margin-bottom: 20px;
}
@media screen and (max-width: 560px) {

.va-input{
  margin: 20px 0px;
  width: 80vw !important;
}
}

.clockContainer{
  position: relative;
  top:0; left:0; bottom:0; right:0; margin: auto;
  width: 150px;
  height: 150px;
  border: 1px solid transparent;
  transform: scale(0.7);
  margin-top:20px;
}

.clockOut{
  width: 80%;
  height: 80%;
  border: 2px solid grey;
  border-radius: 50%;
  position: absolute;
  bottom:0;
  margin-left: auto; margin-right: auto; left:0; right:0;
}

.clockTop{
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-left: 2px solid grey;
  width: 40px;
  top: 18px;
  position: absolute;
  margin-left: auto; 
  margin-right: auto; 
  height: 28px;
  border-radius: 5px;
}

.clockTop.left {
  left:7px;
  -ms-transform:rotate(-40deg); 
  -webkit-transform:rotate(-40deg);
  transform:rotate(-40deg);
}

.clockTop.right {
  right:7px;
  -ms-transform:rotate(40deg); 
  -webkit-transform:rotate(40deg);
  transform:rotate(40deg);
}

.soundWave {
  top: -5px;
  position: absolute;
  margin-left: auto; 
  margin-right: auto;
}

.soundWave.left {
  left: -7px;
  -ms-transform:rotate(-40deg); 
  -webkit-transform:rotate(-40deg);
  transform:rotate(-40deg);
}

.soundWave.right {
  right: -7px;
  -ms-transform:rotate(40deg); 
  -webkit-transform:rotate(40deg);
  transform:rotate(40deg);
}

.soundWave div {
  border-top: 2px solid grey;
  border-radius: 100%;
  margin-left: auto; 
  margin-right: auto;
}

.soundWave .wave1 {
  width: 30px; 
  height: 30px;
  margin-top: -10px;  
}

.soundWave .wave2 {
  width: 20px; 
  height: 20px; 
  margin-top: -20px;
}

.soundWave .wave3 {
  width: 10px; 
  height: 10px; 
  margin-top: -10px;
}

.clockBell{
  border: 2px solid grey;
  width: 20px; 
  height: 10px;
  position: absolute;
  margin-left: auto; 
  margin-right: auto;
  border-radius: 5px;
  right: 0;
  left: 0px;
  top: -1px;
  transform-origin:50% 200%;
  -webkit-transform-origin:50% 200%;
  -webkit-animation: bellAnimation .25s ease-in-out 0s infinite alternate; 
  animation: bellAnimation .25s ease-in-out 0s infinite alternate;
}

.bellArm {
  border-right: 2px solid grey;
  position: absolute;
  margin-left: auto; 
  margin-right: auto;
  width: 2px;
  height: 15px;
  top: 10px;
  left:0;
  right: 0;
}

.clockLeg {
  width: 25px;
  height: 2px;
  background: grey;
  position: absolute;
  top: 100%;
}

.clockLeg.left {
  left: 15%;
  -ms-transform:rotate(-60deg); 
  -webkit-transform:rotate(-60deg);
  transform:rotate(-60deg);
}

.clockLeg.right {
  left: 68%;
  -ms-transform:rotate(60deg); 
  -webkit-transform:rotate(60deg);
  transform:rotate(60deg);
}

.marker {
  width: 2px;
  height: 88px;
  position: absolute;
  left: 50%
}

.marker.large {
  top: 6px;
  border-top: 10px solid grey;
  border-bottom: 10px solid grey;
}

.marker.small {
  top: 10px;
  border-top: 7px solid grey;
  border-bottom: 7px solid grey;
}

.marker.oneseven {
  -ms-transform:rotate(30deg); 
  -webkit-transform:rotate(30deg);
  transform:rotate(30deg);
}

.marker.twoeight {
  -ms-transform:rotate(60deg); 
  -webkit-transform:rotate(60deg);
  transform:rotate(60deg);
}

.marker.threenine {
  -ms-transform:rotate(90deg); 
  -webkit-transform:rotate(90deg);
  transform:rotate(90deg);
}

.marker.fourten {
  -ms-transform:rotate(120deg); 
  -webkit-transform:rotate(120deg);
  transform:rotate(120deg);
}

.marker.fiveeleven {
  -ms-transform:rotate(150deg); 
  -webkit-transform:rotate(150deg);
  transform:rotate(1590deg);
}

.clockSecondNeedle{
  width: 50px;
  height: 2px;
  background: #A3D39C;
  position: absolute;
  top: 50%;
  left: 10px;
  transform-origin:100% 50%;
  -webkit-transform-origin:100% 50%;
  -webkit-animation: needleAnimation 3s linear 0s infinite; 
  animation: needleAnimation 3s linear 0s infinite;
}

.clockMinuteNeedle{
  width: 40px;
  height: 2px;
  background: #A3D39C;
  position: absolute;
  top: 50%;
  left: 20px;
  transform-origin:100% 50%;
  -webkit-transform-origin:100% 50%;
  -webkit-animation: needleAnimation 90s linear 0s infinite; 
  animation: needleAnimation 90s linear 0s infinite;
}

/* Chrome, Safari, Opera */
@-webkit-keyframes needleAnimation {
    from {
        
    }
    to {
        -ms-transform:rotate(360deg); 
        -ms-transform:rotate(360deg); 
        -webkit-transform:rotate(360deg); 
    }
}

/* Standard syntax */
@keyframes needleAnimation {
   from {
        
    }
    to {
        -ms-transform:rotate(360deg); 
        -ms-transform:rotate(360deg); 
        -webkit-transform:rotate(360deg); 
    }
}

/* Chrome, Safari, Opera */
@-webkit-keyframes bellAnimation {
    from {
      -ms-transform:rotate(-60deg); 
      -webkit-transform:rotate(-60deg);
      transform:rotate(-60deg);
    }
    to {
        -ms-transform:rotate(60deg); 
      -webkit-transform:rotate(60deg);
      transform:rotate(60deg);
      
    }
}

/* Standard syntax */
@keyframes bellAnimation {
   from {
      -ms-transform:rotate(-60deg); 
      -webkit-transform:rotate(-60deg);
      transform:rotate(-60deg);
    }
    to {
      
        -ms-transform:rotate(60deg); 
      -webkit-transform:rotate(60deg);
      transform:rotate(60deg);
    }
}

/* Chrome, Safari, Opera */
@-webkit-keyframes soundAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
}

/* Standard syntax */
@keyframes soundAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
}
</style>
