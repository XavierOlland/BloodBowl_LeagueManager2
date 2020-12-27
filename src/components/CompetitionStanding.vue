<template>
  <div id="CompetitionStanding">
    <h3 v-if="details==true">Classement</h3>
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">Equipe</th>
          <th class="text-left d-none d-md-table-cell">Race</th>
          <th class="text-left d-none d-sm-table-cell">Coach</th>
          <th class="text-center">Pts</th>
          <th class="text-center d-none d-md-table-cell" v-if="details==true" title="Victoires">V</th>
          <th class="text-center d-none d-md-table-cell" v-if="details==true" title="Nuls">N</th>
          <th class="text-center d-none d-md-table-cell" v-if="details==true" title="Défaites">D</th>
          <th class="text-center d-none d-sm-table-cell" v-if="details==true" title="Différence de TD">TD</th>
          <th class="text-center d-none d-sm-table-cell" v-if="details==true" title="Différence de sorties">S</th>
          <th class="text-center d-none d-md-table-cell" v-if="details==true && competition.active==1" title="Matchs">M</th>
          <th class="text-center d-none d-md-table-cell" v-if="details==true" title="Points par matchs">Pts/M</th>
        </tr>
      </thead>
      <tbody :class="{'table-hover': details==true}">
        <tr v-for="team in competition.standing.slice(0,limit)" :key="team.id" :class="['standing-' + team.rank, {zelda: teamAccess!=0 }]" @click="goToTeam(team.team_cyanide_id)">
          <td>{{team.rank}}</td>
          <td class="text-left"><img :src="'https://bbbl.fr/img/logos/Logo_'+team.team_logo+'.png'"> {{team.team_name}}</td>
          <td class="text-left d-none d-md-table-cell" >{{team.team_race | talkingToTheGods()}}</td>
          <td class="text-left d-none d-sm-table-cell" >{{team.coach_name}}</td>
          <td class="text-center">{{team.points}}</td>
          <td class="text-center d-none d-md-table-cell" v-if="details==true">{{team.win}}</td>
          <td class="text-center d-none d-md-table-cell" v-if="details==true">{{team.draw}}</td>
          <td class="text-center d-none d-md-table-cell" v-if="details==true">{{team.loss}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{team.touchdowns_diff}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{team.casualties_diff}}</td>
          <td class="text-center d-none d-md-table-cell" v-if="details==true && competition.active==1">{{team.win+team.draw+team.loss}}</td>
          <td class="text-center d-none d-md-table-cell" v-if="details==true">{{team.points / (team.win+team.draw+team.loss) | round(1)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'CompetitionStanding',
    props: {
      competition: Object,
      details: Boolean,
      limit: Number,
      teamAccess: Boolean
    },
    methods: {
      goToTeam(id) {
        if(this.teamAccess == true){
          this.$router.push({ name: 'Team', params: { id: id }})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  th {
    background: $prime-color;
  }
  th, tr {
    height:28px; font-size:14px; border-bottom: 1px solid $prime-color;
  }
  td img{
    max-width: 20px; max-height: 20px; display: inline; padding-right: 2px;
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
