<template>
  <div id="Team" class="view container">
    <Loader v-if="isFetching" :text="chargingText"/>
    <Modal v-if="modal == true"/>
    <div v-if="(user.coach.id==team.coach_id || admin==1)" class="row">
      <div class="col-sm-12">
        <div class="d-flex flex-row justify-content-end tabs">
          <div v-if="admin==1" class="tab dark align-self-start">
            <div class="label" @click="toggleStats()" >Reset</div>
          </div>
          <div class="align-self-start dark"
          :class="{tab : user.coach.id==team.coach_id || user.coach.id==team.coach_id || admin==1}">
            <div class="label" @click="toggleEditor()">Editer</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row scroll-padding">
      <div class="col-lg-12 col-xl-7">
        <div class="plain seconde teamboard" :style="{'border-color': teamColours[1].hex}">
          <Helmet class="helmet" :race="team.param_id_race" :logo="team.logo" :colours="[teamColours[0].hex,teamColours[1].hex]" />
          <div class="row justify-content-between">
            <div class="col-sm-12 col-md-8">
              <h1 :style="{'color':titleText}">{{team.name}}</h1>
              <h2 v-for="n in team.popularity" :key="n" :style="{'color':titleText}">&#9733;</h2>
            </div>
            <div class="text-right col-sm-12 col-md-4">
              <h2 :style="{'color':titleText}">{{team.param_id_race | talkingToTheGods()}}</h2><br/>
              <p class="text-right" >coaché par <span class="" :style="{'color':titleText}"><b>{{team.coach}}</b></span></p>
            </div>
          </div>
          <div class="row staff">
            <div class="col-md-4 col-lg-3">
              <ul class="list-unstyled">
                <li><img src="../assets/icons/treasury.png"> {{Intl.NumberFormat().format(team.cash)}} PO</li>
                <li v-if="team.rerolls>0"><img src="../assets/icons/reroll.png"> {{team.rerolls}} relance<span v-if="team.rerolls>1">s</span></li>
                <li v-if="team.apothecary>0"><img src="../assets/icons/apothecary.png"> {{team.apothecary}} apothicaire</li>
              </ul>
            </div>
            <div class="col-md-4 col-lg-3">
              <ul class="list-unstyled">
                <li v-if="team.cheerleaders>0"><img src="../assets/icons/pompom.png"> {{team.cheerleaders}} pom-pom girl<span v-if="team.cheerleaders>1">s</span></li>
                <li v-if="team.assistantcoaches>0"><img src="../assets/icons/assistant.png"> {{team.assistantcoaches}} assistant<span v-if="team.assistantcoaches>1">s</span></li>
              </ul>
            </div>
            <br/>
          </div>
          <h2 class="noselect" :style="{'color':titleText}">TV {{Intl.NumberFormat().format(team.value)}}</h2>
        </div>
        <div class="plain prime" :style="{'border-color': teamColours[0].hex}">
          <h2>Effectif</h2>
          <Roster :roster="team.players" :colours="[teamColours[0].hex, teamColours[1].hex, titleText]" :formerPlayers="formerPlayers" :showStats="stats" />
          <Button class="d-none d-md-block" :id="'Stats'" :text="'Statistiques'" :color="teamColours[0].hex" @clicked="toggleStats"/>
          <Button class="d-none d-md-block" :id="'FormerPlayers'" :type="'secondary'" :text="formerPlayersText" :color="teamColours[0].hex" @clicked="toggleFormerPlayers"/>
        </div>
      </div>
      <div class="col-lg-12 col-xl-5">
        <div id="TeamEditor" class="plain editor" v-if="displayEditor">
          <h2>Modifier l'apparence</h2>
          <div class="row">
            <div class="col-xl-6 col-xxl-4">
              <h3>Couleur principale</h3>
              <color-picker v-model="teamColours[0]" />
            </div>
            <div class="col-xl-6 col-xxl-4">
              <h3>Couleur secondaire</h3>
              <color-picker v-model="teamColours[1]" />
            </div>
            <div class="col-xl-6 col-xxl-4">
              <FileUploader ref="photo" :uploadFileName="'photo'+team.id"/>
            </div>
          </div>
          <Button class="d-none d-md-block" :id="'Colours'" :text="'Enregistrer'" :color="'#000'" @clicked="saveEdition"/>
        </div>
        <div class="plain photo" :style="{'border-color': teamColours[0].hex}">
          <img class="cover" src="https://bbbl.fr/img/Cover_Glass.161c7da7.png">
          <img src="http://www.bbbl.fr/img/teams/photo673.jpg" @error="altPhoto"/>
          <h6 class="leitmotiv" :style="{'color':teamColours[0].hex}" v-if="team.leitmotiv"> "{{team.leitmotiv}}"</h6>
        </div>
      </div>
    </div>
    <Button :id="'Back'" :type="'back'" @clicked="$router.go(-1)"/>
  </div>
</template>

<script>
  const Color = require('color');

  import Roster from '../components/Roster.vue'
  import Modal from '../components/Modal.vue'
  import Button from '../components/ui/Button.vue';
  import Helmet from '../components/ui/Helmet.vue';
  import Loader from '../components/ui/Loader.vue';
  import FileUploader from '../components/ui/FileUploader.vue';
  import { Chrome } from 'vue-color'

  export default {
    name: 'Team',
    components: {
      Roster,
      Modal,
      Button,
      Helmet,
      Loader,
      FileUploader,
      'color-picker': Chrome,
    },
    data() {
      return {
        isFetching: true,
        admin: window.admin,
        displayEditor: false,
        modal: false,
        stats: false,
        formerPlayers: false,
        formerPlayersText: '+ Anciens',
        teamColours: [],
        teamPhoto: 'img/teams/missing.jpg',
        chargingText: 'Chargement de l\'équipe...'
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      team(){
        return this.$store.state.team.team;
      }
    },
    methods: {
      toggleEditor() {
        this.displayEditor = !this.displayEditor;
      },
      toggleStats() {
        this.stats = !this.stats;
      },
      toggleFormerPlayers() {
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
      },
      coloursUpdate() {
        this.$store.dispatch('team/updateTeamColours',[this.team.id,[this.teamColours[0].hex,this.teamColours[1].hex]]);
        this.toggleEditor;
      },
      photoUpdate() {
         this.$refs.photo.save();
      },
      saveEdition() {
        this.coloursUpdate();
        this.photoUpdate();
      }
    },
    mounted() {
      this.$store.dispatch('team/fetchTeam',this.$route.params.id)
    },
    watch: {
      team: function() {
        this.teamPhoto = 'img/teams/photo'+this.team.id+'.jpg';
        this.teamPhoto = 'img/teams/photo'+this.team.id+'.jpg';
        this.isFetching = this.team.length > 0 ? true : false;
        this.teamColours = [ { hex: this.team.color_1,a: 1}, { hex: this.team.color_2,a: 1} ];
      },
      teamColours: function() {
        this.titleText = Color(this.teamColours[1].hex).luminosity() < 0.08 ? '#AAA' : this.teamColours[1].hex;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .helmet {
    position: absolute;
    right:-1vw;
    bottom:-50px;
    z-index:2;
    width:250px;
    height:250px;
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
    p,ul {
      color: $prime-text;
      font-size: 16px;
      font-weight: 500;
    }
    ul {
      line-height: 40px;
    }
    .staff {
      min-height: 125px;
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
    h6 {
        position: absolute;
        z-index: 1;
        bottom: 0;
        right: 0;
        margin: 0.25em;
        font-size: 3em;
        line-height: 1em;
        text-align: right;
        font-family: 'Niconne', cursive;
        color: $seconde-text;
        text-shadow: 0 0.04em 0.07em $shadow;
    }
    @media (max-width: 1700px) {
      h6 {
        font-size: 2em;
      }
    }
  }
  @media (max-width: 576px) {
    .helmet {
      display: none;
    }
  }
  @media screen and (max-width: 1440px) {
    .vc-chrome {
      width: 200px;
    }
  }
</style>
