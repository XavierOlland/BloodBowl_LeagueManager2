<template>
  <div id="TeamStats" class="plain prime text-center" :style="{'border-color': colours[0]}">
    <div ng-style="team_1_BG"></div>
    <h3 :style="{color: colours[0]}">Statistiques</h3>
    <ul class="stats list-unstyled">
      <li>Possession : <span :style="{color: colours[0]}">{{stats.possessionball}} %</span></li>
      <li>Occupation de son terrain : <span :style="{color: colours[0]}">{{stats.occupationown}} %</span></li>
      <li>Occupation du terrain adverse : <span :style="{color: colours[0]}">{{stats.occupationtheir}} %</span></li>
      <li>Passes : <span :style="{color: colours[0]}">{{stats.inflictedpasses}} </span></li>
      <li>Réceptions : <span :style="{color: colours[0]}">{{stats.inflictedcatches}} </span></li>
      <li>Yards en passe : <span :style="{color: colours[0]}">{{stats.inflictedmeterspassing}} </span></li>
      <li>Yards en course : <span :style="{color: colours[0]}">{{stats.inflictedmetersrunning}} </span></li>
      <li>Blocages : <span :style="{color: colours[0]}">{{stats.inflictedtackles}} </span></li>
      <li>Sonnés : <span :style="{color: colours[0]}">{{stats.inflictedinjuries-stats.inflictedko-stats.inflictedcasualties}} </span></li>
      <li>KO : <span :style="{color: colours[0]}">{{stats.inflictedko}} </span></li>
      <li>Blessures : <span :style="{color: colours[0]}">{{stats.inflictedcasualties}}</span></li>
      <li>Mort : <span :style="{color: colours[0]}">{{stats.inflicteddead}} </span></li>
      <li>Offrande au public : <span :style="{color: colours[0]}">{{stats.inflictedpushouts}} </span></li>
      <li>Expulsions : <span :style="{color: colours[0]}">{{stats.sustainedexpulsions}} </span></li>
    </ul>
    <div class="spacer"></div>
    <div class="button" @click="displayTeam(0,2)">

      <div class="label">Effectif</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'TeamStats',
    props: {
      colours: Array,
      stats: Object
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .stats > li > span {
    font-family: "Muli"
  }
</style>
