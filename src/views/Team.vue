<template>
  <div id="Team" class="view container">
    <Loader v-if="isFetching" :text="chargingText"/>
    <Modal v-if="modal == true"/>
    <div class="row">
      <div class="col-lg-12 col-xl-7">
        <Helmet class="helmet" :race="team.param_id_race" :logo="team.logo" :colours="[team.color_1,team.color_2]" />
        <div class="plain seconde teamboard" :style="{'border-color': team.color_2}">
          <h1 :style="{'color':titleText}">{{team.name}}</h1>
          <h2 :style="{'color':titleText}">{{team.param_id_race | talkingToTheGods()}}</h2><br/>
          <h2 v-for="n in team.popularity" :key="n" :style="{'color':titleText}">&#9733;</h2>
          <div id="fame">
            <h4 class="noselect" :style="{'color':titleText}">TV {{Intl.NumberFormat().format(team.value)}}</h4>
            <h4 :style="{'color':titleText}">{{Intl.NumberFormat().format(team.cash)}} PO</h4>
          </div>
          <div>
            <h4 :style="{'color':titleText}">{{team.roster}}</h4>
            <ul class="teamDetails list-unstyled">
              <li>coaché par <span class="" :style="{'color':titleText}"><b>{{team.coach}}</b></span></li>
              <li v-if="team.sponsor">sponsorisé par <span class="" :style="{'color':titleText}"><b>{{team.sponsor.name}}</b></span></li>
              <li class="zelda" @click="goToPage('competition/'+team.competition.id)" v-if="team.competition.id"> {{team.competition.name}}</li>
            </ul><br />
            <ul class="teamDetails col2 list-unstyled">
              <li v-if="team.rerolls>0">{{team.rerolls}} relance<span v-if="team.rerolls>1">s</span></li>
              <li v-if="team.apothecary>0">{{team.apothecary}} apothicaire</li>
              <li v-if="team.cheerleaders>0">{{team.cheerleader}} pom-pom girl<span v-if="team.cheerleaders>1">s</span></li>
              <li v-if="team.assistantcoaches>0">{{team.assistantcoaches}} assistant<span v-if="team.assistantcoaches>1">s</span></li>
            </ul><br/>
            <h6 class="text-right" :style="{'color':titleText}" v-if="team.leitmotiv"> "{{team.leitmotiv}}"</h6>
          </div>
        </div>
        <div class="plain prime" :style="{'border-color': team.color_1}">
          <h2>Effectif</h2>
          <Roster :roster="team.players" :colours="[team.color_1, team.color_2, titleText]" :formerPlayers="formerPlayers" :showStats="stats" />
          <Button class="d-none d-md-block" :id="'Stats'" :text="'Statistiques'" :color="team.color_1" @clicked="toggleStats"/>
          <Button class="d-none d-md-block" :id="'FormerPlayers'" :level="'secondary'" :text="formerPlayersText" :color="team.color_1" @clicked="toggleFormerPlayers"/>
        </div>
      </div>
      <div class="col-lg-12 col-xl-5">
        <div class="plain photo" :style="{'border-color': team.color_1}">
          <img class="cover" src="../assets/elements/Cover_Glass.png">
          <img :src="teamPhoto" @error="altPhoto"/>
        </div>
      </div>
    </div>
    <Button :id="'Back'" :back="true" @clicked="$router.go(-1)"/>
  </div>
</template>

<script>
  const Color = require('color');

  import Roster from '../components/Roster.vue'
  import Modal from '../components/Modal.vue'
  import Button from '../components/ui/Button.vue';
  import Helmet from '../components/ui/Helmet.vue';
  import Loader from '../components/ui/Loader.vue';

  export default {
    name: 'Team',
    components: {
      Roster,
      Modal,
      Button,
      Helmet,
      Loader
    },
    data(){
      return {
        isFetching: true,
        modal: false,
        stats: false,
        formerPlayers: false,
        formerPlayersText: '+ Anciens',
        teamPhoto: 'img/teams/missing.jpg',
        chargingText: 'Chargement de l\'équipe...'
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
      },
      altPhoto() {
        this.teamPhoto = 'img/teams/missing.jpg'
      }
    },
    mounted() {
      this.$store.dispatch('team/fetchTeam',this.$route.params.id)
    },
    watch: {
      team: function() {
        this.teamPhoto = 'img/teams/photo'+this.team.id+'.jpg';
        this.isFetching = this.team.length > 0 ? true : false;
        this.titleText = Color(this.team.color_2).luminosity() < 0.05 ? '#AAA' : this.team.color_2;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .helmet {
    position: absolute;
    right:-1vw;
    top:0;
    z-index:2;
    width:300px;
    height:300px;
  }
  .teamboard {
    padding-bottom: 10px;
    text-shadow: 0 1px 5px $shadow;
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
  @media (max-width: 576px) {
    .helmet {
      position: relative;
    }
  }
</style>
