<template>
  <div id="UpcomingGames" class="plain prime" v-if="games.length>0">
    <h2>Programme CabalVision</h2>
    <p v-if="games.length==0">Aucun match de programmé pour le moment.</p>
    <div v-for="day in games" :key="day.day">
      <h3 class="col-xs-12">{{day.day | moment('dddd D MMMM')}}</h3>
      <div class="time noPadding" v-for="match in day.matchs" :key="match.id">
        <h4 class="col-xs-2">{{match.planned | moment('HH:mm')}}</h4>
        <div class="match">
          <div class="col-xs-3 text-right noPadding"><h4>{{match.name_1}}</h4></div>
          <div class="col-xs-3 x-center noPadding">
            <img class="teamLogo" :src="require('../assets/logos/Logo_' + match.logo_1 + '.png')">
            <img class="versus" style="width:30px;" src="../assets/elements/vs.png">
            <img class="teamLogo" :src="require('../assets/logos/Logo_' + match.logo_2 + '.png')">
          </div>
          <div class="col-xs-3 text-left noPadding"><h4>{{match.name_2}}</h4></div>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
    <a class="button">
      <div class="label">Administrer</div>
    </a>
  </div>
</template>

<script>
  const moment = require('moment')

  export default {
    name: 'UpcomingGames',
    props: {
      games: Array
    }
  }
</script>

<style lang="scss" scoped>
  h3 {
    text-transform: capitalize;
    margin-bottom: 0.75em;
  }
  .time {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      flex: 2
    }
    .match {
      flex: 10;
      display: inline-flex;
      justify-content: space-around;
      align-items: center
    }
  }
  .teamLogo {
    width: 40px;
    height: 40px;
    display: inline;
    vertical-align: middle;
  }
</style>
