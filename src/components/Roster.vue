<template>
  <div id="Roster">
    <table>
      <thead>
      <tr :style="{background: colours[0]}">
        <th class="text-left">Joueur</th>
        <th class="text-left">Position</th>
        <th class="attributes text-center" v-if="!showStats">MA</th>
        <th class="attributes text-center" v-if="!showStats">FO</th>
        <th class="attributes text-center" v-if="!showStats">AG</th>
        <th class="attributes text-center" v-if="!showStats">AV</th>
        <th class="attributes text-center" v-if="!showStats">Niv</th>
        <th class="attributes text-center" v-if="!showStats">XP</th>
        <th class="attributes text-center" v-if="showStats" title="Joueur du match">JDM</th>
        <th class="attributes text-center" v-if="showStats" title="Passes">Pa</th>
        <th class="attributes text-center" v-if="showStats" title="Réceptions">Réc</th>
        <th class="attributes text-center" v-if="showStats" title="Interceptions">Int</th>
        <th class="attributes text-center" v-if="showStats" title="TouchDown">TD</th>
        <th class="attributes text-center" v-if="showStats" title="Mort">Mort</th>
        <th class="attributes text-center" v-if="showStats" title="Sorties">Sor</th>
        <th class="attributes text-center" v-if="showStats" title="KO">KO</th>
        <th class="attributes text-center" v-if="showStats" title="Blocage">Bl</th>
        <th class="attributes text-center" v-if="showStats" title="Yards en passe">YP</th>
        <th class="attributes text-center" v-if="showStats" title="Yards en course">YC</th>
      </tr>
      </thead>
      <tbody  class="table-hover noselect">
        <tr v-for="player in roster" :key="player.id" v-show="(player.dead+player.fired)==0 || formerPlayers==true" :style="{'border-color': colours[0]}">
          <td class="text-left text-cutter">
            <span class="playerStatus" v-if="player.casualties.length>2"><img src="../assets/icons/injured.png"> </span>
            <span class="playerStatus" v-if="player.dead==1"><img src="../assets/icons/dead.png"> </span>
            <span>{{player.name}}</span>
          </td>
          <td class="text-left text-cutter">{{player.position | talkingToTheGods()}}</td>
          <td class="text-center" v-if="!showStats">{{JSON.parse(player.attributes).ma}}</td>
          <td class="text-center" v-if="!showStats">{{JSON.parse(player.attributes).st}}</td>
          <td class="text-center" v-if="!showStats">{{JSON.parse(player.attributes).ag}}</td>
          <td class="text-center" v-if="!showStats">{{JSON.parse(player.attributes).av}}</td>
          <td class="text-center" v-if="!showStats">{{player.fired}}</td>
          <td class="text-center" v-if="!showStats">{{player.xp}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.mvp}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflictedpasses}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflictedcatches}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflictedinterceptions}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflictedtouchdowns}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflicteddead}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflictedcasualties}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflictedko}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflictedtackles}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflictedmeterspassing}}</td>
          <td class="text-center" v-if="showStats">{{player.stats.inflictedmetersrunning}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Roster',
    props: {
      colours: Array,
      roster: Array,
      showStats: Boolean,
      formerPlayers: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  tr {
    height:28px;
    font-size:14px;
    border-bottom: 1px solid #FFF;
  }
  thead tr {
    border:none;
  }
  .playerStatus {
    img{
      height: 20px;
      width: 20px;
      margin-right: 5px;
      vertical-align: text-bottom;
    }
  }
</style>
