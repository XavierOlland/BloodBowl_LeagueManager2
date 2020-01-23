<template>
  <div id="Team" class="view container" v-if="!isFetching">
    <Modal v-if="modal == true"/>
    <div class="row">
      <div class="col-lg-7">
        <Helmet class="helmet" :race="team.param_id_race" :logo="team.logo" :colours="[team.color_1,team.color_2]" />
        <div class="plain seconde teamboard" :style="{'border-color': team.color_2}">
          <h1 :style="{'color':team.color_2}">{{team.name}}</h1>
          <h2 v-for="n in team.popularity" :key="n" :style="{'color':team.color_2}">&#9733;</h2>
          <div id="fame">
            <h4 class="noselect" :style="{'color':team.color_2}">TV {{team.value}}</h4>
            <h4 :style="{'color':team.color_2}">{{team.cash}} PO</h4>
          </div>
          <div>
            <h4 :style="{'color':team.color_2}">{{team.roster}}</h4>
            <ul class="teamDetails list-unstyled">
              <li>coaché par <span class="" :style="{'color':team.color_2}"><b>{{team.coach}}</b></span></li>
              <li v-if="team.sponsor">sponsorisé par <span class="" :style="{'color':team.color_2}"><b>{{team.sponsor.name}}</b></span></li>
              <li class="zelda" @click="goToPage('competition/'+team.competition.id)" v-if="team.competition.id"> {{team.competition.name}}</li>
            </ul><br />
            <ul class="teamDetails col2 list-unstyled">
              <li ng-if="team.rerolls>0">{{team.rerolls}} relance<span ng-if="team.rerolls>1">s</span></li>
              <li ng-if="team.apothecary>0">{{team.apothecary}} apothicaire</li>
              <li ng-if="team.cheerleaders>0">{{team.cheerleader}} pom-pom girl<span ng-if="team.cheerleaders>1">s</span></li>
              <li ng-if="team.assistantcoaches>0">{{team.assistantcoaches}} assistant<span ng-if="team.assistantcoaches>1">s</span></li>
            </ul><br/>
            <h6 class="text-right" :style="{'color':team.color_2}" v-if="team.leitmotiv"> "{{team.leitmotiv}}"</h6>
          </div>
        </div>
        <div class="plain prime" :style="{'border-color': team.color_1}">
          <h2>Effectif</h2>
          <Roster :roster="team.players" :colours="[team.color_1,team.color_2]" :formerPlayers="formerPlayers" :showStats="stats" />
          <Button :id="'Stats'" :text="'Statistiques'" :color="team.color_1" @clicked="toggleStats"/>
          <Button :id="'FormerPlayers'" :level="'secondary'" :text="formerPlayersText" :color="team.color_1" @clicked="toggleFormerPlayers"/>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="plain photo" v-if="team.id>268" :style="{'border-color': team.color_1}">
          <img class="cover" src="../assets/elements/Cover_Glass.png">
          <img :src="require('../assets/teams/photo'+team.id+'.jpg')" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Roster from '../components/Roster.vue'
  import Modal from '../components/Modal.vue'
  import Button from '../components/ui/Button.vue';
  import Helmet from '../components/ui/Helmet.vue';


  export default {
    name: 'Team',
    components: {
      Roster,
      Modal,
      Button,
      Helmet
    },
    data(){
      return {
        modal: false,
        stats: false,
        formerPlayers: false,
        formerPlayersText: '+ Anciens'
      }
    },
    computed:{
      team(){
        return this.$store.state.team.team;
      }
    },
    methods: {
      toggleStats: function() {
        this.stats = !this.stats;
      },
      toggleFormerPlayers: function() {
        this.formerPlayers = !this.formerPlayers;
        if(this.formerPlayers == true){
          this.formerPlayersText = '- Anciens';
        }
        else {
          this.formerPlayersText = '+ Anciens';
        }
      }
    },
    mounted() {
      this.$store.dispatch('team/fetchTeam',this.$route.params.id)
    },
    watch: {
      team: function() {
        this.isFetching = this.team.length>0? true : false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .helmet {
    position: absolute; right:-1vw; top:0; z-index:2; width:300px; height:300px;
  }
  .teamboard {
    padding-bottom: 10px;
    text-shadow: 0 2px 5px #000000;
    h1 {
      margin-bottom: 0;
    }
    h2 {
      display: inline-block;
    }
  }
  .photo {
    padding:0;
    img {
      width: 100%;
      height: 100%;
    }
    .cover{
      position: absolute;
      z-index: 2;
    }
  }
</style>
