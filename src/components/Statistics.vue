<template>
  <div id="Statistics">
    <div class="veil" v-show="modal == true" @click="modalView"></div>
    <div class="card plain seconde" :class="{ modal: modal == true }">
      <h3>{{statistics.type | talkingToTheGods()}}</h3>
      <div v-if="statistics.players.length > 0">
        <div class="scroll">
        <table class="mainStats">
          <thead>
            <tr class="background">
              <th class="text-left">Joueur</th>
              <th class="text-center" >{{statistics.stats[0] | talkingToTheGods()}}</th>
            </tr>
          </thead>
          <tbody class="noselect">
            <tr class="playerDetails" v-for="player in statistics.players.slice(0,max)" :key="player.player">
              <td class="text-left text-cutter">{{player.name}}</td>
              <td class="text-center" >{{player.stat0}}</td>
            </tr>
          </tbody>
        </table>
      </div>
        <div class="spacer"></div>
        <div class="button" @click="modalView">{{buttonText}}</div>
      </div>
      <div v-else>
        <p>Aucun résultat pour le moment</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Statistics',
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
  }
  thead tr {
    border:none;
  }
</style>
