<template>
  <div id="Champion" class="plain prime">
    <Helmet class="helmet" :race="race" :logo="logo" :colours="colours" />
    <img class="logo" :src="require('../assets/logos/Logo_'+logo+'.png')"/>
    <div class="spacer">
      <h3 v-if="mode!='list'">CHAMPION</h3>
      <h3>{{competition.name}}</h3>
      <hr>
      <h1>{{team}}</h1>
      <hr>
      <h2>{{coach}}</h2>
    </div>
    <div class="info">
      <h3 v-if="mode!='list'">CHAMPION</h3>
      <h3>{{competition.name}}</h3>
      <hr>
      <h1>{{team}}</h1>
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
      team: String,
      race: Number,
      logo: String,
      colours: Array
    }
  }
</script>

<style lang="scss" scoped>
    #Champion {
      text-align: center;
      margin-top: 50px
    }
    hr {
      width: 80%;
      border-top: 1px solid #ffffff;
      text-align: center;
      margin: 10px auto;
    }
    .helmet {
      position: absolute;
      right:-60px;
      top:-50px;
      z-index:0;
      width:200px;
      height:200px;
      text-align: left !important;
    }
    .spacer {
      opacity:0;
    }
    .info {
      position: absolute;
      top:20px;
      width:calc(100% - 30px);
      z-index: 3
    }
    .button {
      z-index:5
    }
    .logo {
      position: absolute;
      z-index:2;
      height: auto;
      width: 25%;
      bottom: 5%;
      left: 5%;
      transform: rotate(-10deg);
      opacity: 0.3
    }
</style>
