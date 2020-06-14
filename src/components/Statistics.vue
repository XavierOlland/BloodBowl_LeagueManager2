<template>
  <div id="Statistics" v-if="statistics.players.length>0">
    <div class="veil" v-show="modal == true" @click="modalView"></div>
    <div class="card plain seconde" :class="{ modal: modal == true }">
      <h3>{{statistics.type | talkingToTheGods()}}</h3>
      <div>
        <div class="scroll">
          <table class="mainStats">
            <thead>
              <tr class="background">
                <th width="5%"></th>
                <th :width="modal==false?'60%':'25%'" class="text-left">Joueur</th>
                <th v-if="modal==true" width="25%" class="text-left">Race</th>
                <th v-if="modal==true" width="25%" class="text-left">Team</th>
                <th :width="modal==false?'35%':'20%'" class="text-center" >{{statistics.stats[0] | talkingToTheGods()}}</th>
              </tr>
            </thead>
            <tbody class="noselect" :class="{ 'table-hover': modal == true }">
              <tr class="playerDetails" v-for="player in statistics.players.slice(0,max)" :key="player.player">
                <td class="logo"><img :src="require('../assets/logos/Logo_'+player.logo+'.png')"></td>
                <td class="text-left text-cutter">{{player.name}}</td>
                <td v-if="modal==true" class="text-left text-cutter">{{player.race | talkingToTheGods()}}</td>
                <td v-if="modal==true" class="text-left text-cutter">{{player.team}}</td>
                <td class="text-center" >{{player.stat0}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button :id="'Stats'" :text="buttonText" @clicked="modalView" />
      </div>
    </div>
  </div>
</template>

<script>
  import Button from '../components/ui/Button.vue';

  export default {
    name: 'Statistics',
    components:{
      Button
    },
    props: {
      statistics: Object,
      limit: Number
    },
    data() {
      return {
        modal:false,
        buttonText: "Plus de stats",
        max:this.limit
      }
    },
    computed: {

    },
    methods: {
      modalView() {
        this.modal = !this.modal;
        this.max = (this.max == 3) ? 100 : 3;
        this.buttonText = (this.buttonText == "Fermer") ? "Plus de stats" : "Fermer";
      }
    }
  }
</script>

<style lang="scss" scoped>
  tr {
    height:28px;
    font-size:14px;
    border-bottom: 1px solid #FFF;
    .logo {
      width: 26px;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  thead tr {
    border:none;
  }
  .modal {
    position: fixed;
    top: 65px;
    left: 0;
    margin: 10vh 10vw;
  }
</style>
