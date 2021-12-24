<template>
  <div id="Competitions">
    <table>
      <thead>
      <tr :style="'background:' + colours[0]">
        <th class="text-left">Competition</th>
        <th class="text-center d-resp-none">Classement</th>
        <th class="text-center d-resp-table-cell" title="Classement">Cl</th>
        <th class="text-center d-resp-none">Points</th>
        <th class="text-center d-resp-table-cell" title="Points">Pts</th>
        <th class="text-center d-none d-sm-table-cell d-resp-none" v-if="details==true">Victoires</th>
        <th class="text-center d-resp-table-cell" v-if="details==true" title="Victoires">V</th>
        <th class="text-center d-none d-sm-table-cell d-resp-none" v-if="details==true">Nuls</th>
        <th class="text-center d-resp-table-cell" v-if="details==true" title="Nuls">N</th>
        <th class="text-center d-none d-sm-table-cell d-resp-none" v-if="details==true">Défaites</th>
        <th class="text-center d-resp-table-cell" v-if="details==true" title="Défaites">D</th>
        <th class="text-center d-none d-sm-table-cell" v-if="details==true" title="Différence de TD">TD</th>
        <th class="text-center d-none d-md-table-cell d-resp-none" v-if="details==true">Sorties</th>
        <th class="text-center d-resp-table-cell" v-if="details==true" title="Différence de sorties">S</th>
        <th class="text-center d-none d-md-table-cell d-resp-none" v-if="details==true">Matchs</th>
        <th class="text-center d-resp-table-cell" v-if="details==true" title="Matchs">M</th>
        <th class="text-center d-none d-md-table-cell d-resp-none" v-if="details==true" >Pts/Matchs</th>
        <th class="text-center d-resp-table-cell" v-if="details==true" title="Points par matchs">P/M</th>
      </tr>
      </thead>
      <tbody  class="table-hover noselect">
        <tr v-for="competition in history" :key="competition.id"
        :class="['standing-' + competition.rank]" class="zelda teamHover" :style="{'border-color': colours[0]}"
        @click="$router.push({ name: 'Competition', params: { id: competition.competition_id }})">
          <td class="text-left text-cutter d-resp-none">{{competition.season===competition.competition_name?competition.season:competition.season+' - '+competition.competition_name}}</td>
          <td class="text-left text-cutter d-resp-table-cell" style="max-width:120px">{{competition.season===competition.competition_name?competition.season:competition.season+' - '+competition.competition_name}}</td>
          <td class="text-center text-cutter">{{competition.rank}}</td>
          <td class="text-center">{{competition.points}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{competition.win}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{competition.draw}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{competition.loss}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{competition.touchdowns_diff}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{competition.casualties_diff}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{competition.matches}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{competition.points / competition.matches | round(1)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  const Color = require('color');

  export default {
    name: 'Competitions',
    props: {
      colours: Array,
      history: Array,
      details: Boolean
    },
    methods: {
      updateColours() {
        var tableText = Color(this.colours[0]).isLight() ? '#000' : '#EEE';
        var tableHover = Color(this.colours[0]).isLight() ? Color(this.colours[0]).darken(0.2) : this.colours[0];
        document.querySelector(':root').style.setProperty('--team-1', tableHover);
        document.querySelector(':root').style.setProperty('--team-table', tableText);
      }
    },
    mounted() {
      this.updateColours();
    },
    watch: {
      colours: function() {
        this.updateColours();
      }
    }
  }
</script>

<style lang="css" scoped>
  :root {
    --team-1: rgba(50,50,50,0.85);
    --team-table: #EEE;
  }
  table {
    width: 100%
  }
  tr {
    height:28px;
    font-size:14px;
    border-bottom: 1px solid var(--team-1);
    color: #EEE;
    text-indent: 0.25rem;
  }
  thead tr {
    border:none;
    color: var(--team-table)
  }
  .former {
    background: linear-gradient(to right, rgba(50,50,50,0.85), rgba(50,50,50,0.65), rgba(50,50,50,0.1));
  }
  .teamHover:hover {
    background: linear-gradient(to right, rgba(0,0,0,0.1), var(--team-1), rgba(0,0,0,0.1)) !important;
  }
  .d-resp-table-cell, .d-resp-block {
    display: none;
  }
  @media (max-width: 992px), (min-width: 1200px) and (max-width: 1750px) {
    .d-resp-none {
      display: none !important;
    }
    .d-resp-table-cell {
      display: table-cell;
    }
  }
  .standing-1 {
    background: linear-gradient(to left, rgba(255,215,0,0.1),rgba(255,215,0,0.65), rgba(255,215,0,0.1));
  }
  .standing-2 {
    background: linear-gradient(to left, rgba(192,192,192,0.1),rgba(192,192,192,0.65), rgba(192,192,192,0.1));
  }
  .standing-3 {
    background: linear-gradient(to left, rgba(205,127,50,0.1),rgba(205,127,50,0.65), rgba(205,127,50,0.1));
  }
</style>
