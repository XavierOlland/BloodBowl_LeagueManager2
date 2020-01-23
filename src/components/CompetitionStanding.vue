<template>
  <div id="CompetitionStanding">
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">Equipe</th>
          <th class="text-left d-none d-sm-table-cell">Coach</th>
          <th class="text-center">Pts</th>
          <th class="text-center d-none d-md-table-cell" v-if="details==true">V</th>
          <th class="text-center d-none d-md-table-cell" v-if="details==true">N</th>
          <th class="text-center d-none d-md-table-cell" v-if="details==true">D</th>
          <th class="text-center d-none d-sm-table-cell" v-if="details==true">TD</th>
          <th class="text-center d-none d-sm-table-cell" v-if="details==true">S</th>
          <th class="text-center d-none d-md-table-cell" v-if="details==true">M</th>
          <th class="text-center d-none" v-if="details==true" >Pts/M</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in competition.slice(0,limit)" :key="team.id" :class="'standing-' + index" @click="goToTeam(team.cyanide_id)">
          <td>{{index+1}}</td>
          <td class="text-left"><img :src="require('../assets/logos/Logo_'+team.logo+'.png')"> {{team.name}}</td>
          <td class="text-left d-none d-sm-table-cell" >{{team.coach}}</td>
          <td class="text-center">{{team.Pts}}</td>
          <td class="text-center d-none d-md-table-cell" v-if="details==true">{{team.V}}</td>
          <td class="text-center d-none d-md-table-cell" v-if="details==true">{{team.N}}</td>
          <td class="text-center d-none d-md-table-cell" v-if="details==true">{{team.D}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{team.TD}}</td>
          <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{team.S}}</td>
          <td class="text-center d-none d-md-table-cell" v-if="details==true">{{team.V+team.N+team.D}}</td>
          <td class="text-center d-none" v-if="details==true">{{team.Pts / (team.V+team.N+team.D) | round(1)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'CompetitionStanding',
    props: {
      competition: Array,
      details: Boolean,
      limit: Number,
      teamAccess: Boolean
    },
    methods: {
      goToTeam(id){
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

  .standing-0 {
    background: linear-gradient(to left, rgba(255,215,0,0.1),rgba(255,215,0,0.65), rgba(255,215,0,0.1));
  }
  .standing-1 {
    background: linear-gradient(to left, rgba(192,192,192,0.1),rgba(192,192,192,0.65), rgba(192,192,192,0.1));
  }
  .standing-2 {
    background: linear-gradient(to left, rgba(205,127,50,0.1),rgba(205,127,50,0.65), rgba(205,127,50,0.1));
  }
</style>
