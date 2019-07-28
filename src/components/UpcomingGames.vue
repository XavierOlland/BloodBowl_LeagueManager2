<template>
  <div id="UpcomingGames" class="plain prime" v-if="games.length>0">
    <h2>Programme CabalVision</h2>
    <p v-if="games.length==0">Aucun match de programmé pour le moment.</p>
    <div v-for="day in games" :key="day.day" style="display:inline-flex;">
      <h3 class="col-xs-12">{{day.day}}</h3>
      <div class="match noPadding" v-for="match in day.matchs" :key="match.id">
        <h4 class="col-xs-2">{{match.planned}}</h4>
          <div class="col-xs-3 text-right noPadding"><h4>{{match.name_1}}</h4></div>
          <div class="col-xs-3 x-center noPadding">
            <img class="teamLogo" src=match.logo_1><img class="versus" style="width:30px;" src="../assets/elements/vs.png"><img class="teamLogo" src=match.logo_2>
          </div>
          <div class="col-xs-3 text-left noPadding"><h4>{{match.name_2}}</h4></div>
      </div>
    </div>
    <div class="spacer"></div>
    <a class="button">
      <div class="label">Administrer</div>
    </a>
  </div>
</template>

<script>

export default {
  name: 'UpcomingGames',
  props: {
    games: Object
  }
}
</script>
