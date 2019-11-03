<template>
  <div id="PlayersStats">
    <div class="veil" v-show="modal == true" @click="close"></div>
    <div class="card plain seconde modal" v-show="modal == true">
      <h3 :style="{color: colours[0]}">Effectif</h3>
        <table>
          <thead>
          <tr :style="{background: colours[0]}">
            <th class="text-left">Joueur</th>
            <th class="text-left position hidden-sm-down">Position</th>
            <th class="text-center hidden-xs-down">Niv</th>
            <th class="attributes text-center hidden-xs-down">XP</th>
            <th class="attributes text-center" title="Joueur du match">JDM</th>
            <th class="attributes text-center" title="Passes">Pa</th>
            <th class="attributes text-center" title="Réceptions">Réc</th>
            <th class="attributes text-center" title="Interceptions">Int</th>
            <th class="attributes text-center" title="TouchDown">TD</th>
            <th class="attributes text-center" title="Mort">Mort</th>
            <th class="attributes text-center" title="Sorties">Sor</th>
            <th class="attributes text-center" title="KO">KO</th>
            <th class="attributes text-center" title="Blocage">Bl</th>
            <th class="attributes text-center" title="Yards en passe">YP</th>
            <th class="attributes text-center" title="Yards en course">YC</th>
          </tr>
          </thead>
          <tbody  class="table-hover noselect">
            <tr v-for="player in roster" :style="{'border-color': colours[0]}">
                <td class="text-left text-cutter">
                  <span class="playerStatus" :title="player.casualties_sustained[0] | talkingToTheGods()" v-if="player.casualties_sustained.length > 0 && player.stats.sustainedcasualties > 0 && player.stats.sustaineddead==0"><img src="../../assets/icons/injured.png"> </span>
                  <span class="playerStatus" v-if="player.stats.sustaineddead==1"><img src="../../assets/icons/dead.png"> </span>
                  <span v-if="player.type.indexOf('StarPlayer')==-1">{{player.name}}</span>
                  <span v-if="player.type.indexOf('StarPlayer')>-1">&#9733; {{player.type | talkingToTheGods()}}</span>
                </td>
                <td class="text-left text-cutter hidden-sm-down" v-if="player.type.indexOf('StarPlayer')==-1">{{player.type | talkingToTheGods()}}</td>
                <td class="text-left text-cutter hidden-sm-down" v-if="player.type.indexOf('StarPlayer')>-1">Champion</td>
                <td class="text-center hidden-xs-down">{{player.level}}</td>
                <td class="text-center hidden-xs-down">{{player.xp}}</td>
                <td class="text-center">{{player.mvp}}</td>
                <td class="text-center">{{player.stats.inflictedpasses}}</td>
                <td class="text-center">{{player.stats.inflictedcatches}}</td>
                <td class="text-center">{{player.stats.inflictedinterceptions}}</td>
                <td class="text-center">{{player.stats.inflictedtouchdowns}}</td>
                <td class="text-center">{{player.stats.inflicteddead}}</td>
                <td class="text-center">{{player.stats.inflictedcasualties}}</td>
                <td class="text-center">{{player.stats.inflictedko}}</td>
                <td class="text-center">{{player.stats.inflictedtackles}}</td>
                <td class="text-center">{{player.stats.inflictedmeterspassing}}</td>
                <td class="text-center">{{player.stats.inflictedmetersrunning}}</td>
              </tr>
          </tbody>
        </table>
        <div class="spacer"></div>
        <div class="button" @click="close">{{buttonText}}</div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'PlayersStats',
    props: {
      colours: Array,
      roster: Array,
      modal: Boolean
    },
    data() {
      return {
        buttonText: "Fermer"
      }
    },
    computed: {

    },
    methods: {
      close: function(){
        this.$emit('clicked')
      }
    },
    mounted(){
      console.log(this.modal)
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
  .playerStatus {
    img{
      height: 20px;
      width: 20px;
      margin-right: 5px;
      vertical-align: text-bottom;
    }
  }
</style>
