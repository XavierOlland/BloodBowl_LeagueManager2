<template>
  <div id="TeamStats" class="plain prime text-center" :style="{'border-color': colours[0]}">
    <img :src="require('../../assets/logos/Logo_'+team.teamlogo+'.png')" class="background">
    <h3 :style="{color: colours[0]}" class="info">Statistiques</h3>
    <ul class="stats list-unstyled info">
      <li>Possession : <span :style="{color: colours[0]}">{{team.possessionball}} %</span></li>
      <li>Occupation de son terrain : <span :style="{color: colours[0]}">{{team.occupationown}} %</span></li>
      <li>Occupation du terrain adverse : <span :style="{color: colours[0]}">{{team.occupationtheir}} %</span></li>
      <li>Passes : <span :style="{color: colours[0]}">{{team.inflictedpasses}} </span></li>
      <li>Réceptions : <span :style="{color: colours[0]}">{{team.inflictedcatches}} </span></li>
      <li>Yards en passe : <span :style="{color: colours[0]}">{{team.inflictedmeterspassing}} </span></li>
      <li>Yards en course : <span :style="{color: colours[0]}">{{team.inflictedmetersrunning}} </span></li>
      <li>Blocages : <span :style="{color: colours[0]}">{{team.inflictedtackles}} </span></li>
      <li>Sonnés : <span :style="{color: colours[0]}">{{team.inflictedinjuries-team.inflictedko-team.inflictedcasualties}} </span></li>
      <li>KO : <span :style="{color: colours[0]}">{{team.inflictedko}} </span></li>
      <li>Blessures : <span :style="{color: colours[0]}">{{team.inflictedcasualties}}</span></li>
      <li>Mort : <span :style="{color: colours[0]}">{{team.inflicteddead}} </span></li>
      <li>Offrande au public : <span :style="{color: colours[0]}">{{team.inflictedpushouts}} </span></li>
      <li>Expulsions : <span :style="{color: colours[0]}">{{team.sustainedexpulsions}} </span></li>
    </ul>
    <div class="spacer"></div>
    <div class="button" @click="displayRoster">

      <div class="label">Effectif</div>
    </div>
    <PlayersStats :colours="colours" :roster="team.roster" :modal="modal" @clicked="displayRoster"/>
  </div>
</template>

<script>
  import PlayersStats from './PlayersStats.vue'

  export default {
    name: 'TeamStats',
    components: {
      PlayersStats
    },
    props: {
      colours: Array,
      team: Object
    },
    data() {
      return {
        modal: false
      }
    },
    methods: {
      displayRoster: function(){
        this.modal = !this.modal;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .stats {
    font-family: "Muli"
  }
  .logo_BG {
    position: absolute;
    z-index: -1;
  }
  .info {
    position:relative;
    z-index: 1;
  }
  .background {
    position: absolute;
    top: 20%;
    left: 30%;
    width: 40%;
    height: auto;
    opacity: 0.15;
  }
</style>
