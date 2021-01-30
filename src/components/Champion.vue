<template>
  <div id="Champion" class="plain prime">
    <Helmet class="helmet" :race="race" :logo="logo" :colours="colours" />
    <img class="logo" :src="'https://bbbl.fr/img/logos/Logo_'+logo+'.png'"/>
    <div class="info" :class="{zelda:mode!='list'}" @click="goToTeam()">
      <h3 v-if="mode!='list'">CHAMPION</h3>
      <h3>{{competition.name}}</h3>
      <hr>
      <h1>{{team.name}}</h1>
      <h5>{{race | talkingToTheGods()}}</h5>
      <hr>
      <h2>{{coach}}</h2>
    </div>
    <Button v-if="mode=='list'" class="button" :id="'Prime'" :text="'La Compétition'" @clicked="$router.push({ name: 'Competition', params: { id: competition.id }})" />
  </div>
</template>

<script>
  import Button from '../components/ui/Button.vue';
  import Helmet from '../components/ui/Helmet.vue';

  export default {
    name: 'Champion',
    components: {
      Button,
      Helmet
    },
    props: {
      mode: String,
      competition: Object,
      coach: String,
      team: Object,
      race: Number,
      logo: String,
      colours: Array
    },
    methods: {
      goToTeam() {
        this.$router.push({ name: 'Team', params: { id: this.team.id }})
      }
    }
  }
</script>

<style lang="scss" scoped>
    #Champion {
      text-align: center;
      margin-top: 3rem;
    }
    h1, h3 {
      text-shadow: 0 0 0.5rem $prime-bg;
    }
    hr {
      width: 80%;
      border-top: 1px solid #ffffff;
      text-align: center;
      margin: 10px auto;
    }
    .helmet {
      position: absolute;
      right:-2rem;
      top:-2.5rem;
      z-index:0;
      width:10rem;
      height:10rem;
      text-align: left !important;
    }
    .spacer {
      opacity:0;
    }
    .info {
      position: relative;
      top:20px;
      z-index: 3
    }
    .button {
      z-index:5
    }
    .logo {
      position: absolute;
      z-index:2;
      height: auto;
      width: auto;
      max-height: 75%;
      max-width: 25%;
      bottom: 5%;
      left: 5%;
      transform: rotate(-10deg);
      opacity: 0.3
    }
</style>
