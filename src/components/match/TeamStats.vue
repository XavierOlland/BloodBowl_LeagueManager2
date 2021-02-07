<template>
  <div id="TeamStats" class="plain prime text-center" :style="{'border-color': colours[0]}">
    <div class="background">
      <img :src="'https://bbbl.fr/img/logos/Logo_'+team.teamlogo+'.png'" >
    </div>
    <h3 :style="{color: colours[0]}" class="info">Statistiques</h3>
    <ul class="stats list-unstyled  card-columns">
      <li>Possession : <span :style="{color: colours[0]}">{{team.possessionball}} %</span></li>
      <li>Occupation propre terrain : <span :style="{color: colours[0]}">{{team.occupationown}} %</span></li>
      <li>Occupation terrain adverse : <span :style="{color: colours[0]}">{{team.occupationtheir}} %</span></li>
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
    <div class="d-xxl-none" v-hide="forum">
      <Button class="d-none d-md-block" :id="team.idteamlisting.toString()" :text="'Effectif'" :color="colours[0]" @clicked="displayRoster" />
      <PlayersStats :id="team.idteamlisting.toString()" :colours="colours" :roster="team.roster" :modal="modal"  :display="display" @clicked="displayRoster"/>
    </div>
  </div>
</template>

<script>
  import PlayersStats from './PlayersStats.vue'
  import Button from '../ui/Button.vue';

  export default {
    name: 'TeamStats',
    components: {
      PlayersStats,
      Button
    },
    props: {
      colours: Array,
      team: Object
    },
    data() {
      return {
        modal: false,
        display: false,
        forum: false
      }
    },
    methods: {
      displayRoster: function(){
        this.modal = !this.modal;
        this.display = !this.display;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .stats {
    column-count: 1;
    span {
      font-weight: 700;
    }
  }
  @media screen and (min-width: 1820px) {
    .stats {

      column-count: 2;
    }
  }
  .background {
    position: absolute;
    top: 10%;
    left: 25%;
    height: 80%;
    width: 50%;
    img {
      width: auto;
      height: 100%;
      opacity: 0.15;
    }
  }

</style>
