<template>
  <div id="StandingSingleElimination">
    <div v-if="details==true && qualified.length>1">
      <h3>En lice</h3>
      <table>
        <thead>
          <tr>
            <th class="text-left">Equipe</th>
            <th class="text-left d-none d-sm-table-cell">Coach</th>
            <th class="text-left" v-if="details==true">Tour</th>
            <th class="text-center d-none d-sm-table-cell" v-if="details==true">TD</th>
            <th class="text-center d-none d-sm-table-cell" v-if="details==true">S</th>
            <th class="text-center d-none d-sm-table-cell" v-if="details!=true">Statut</th>
          </tr>
        </thead>
        <tbody :class="{'table-hover': details==true}">
          <tr v-for="team in qualified"  :key="team.id" :class="[{zelda: teamAccess!=0 }]" @click="goToTeam(team.cyanide_id)">
            <td class="text-left"><img :src="require('../assets/logos/Logo_'+team.logo+'.png')"> {{team.name}}</td>
            <td class="text-left d-none d-sm-table-cell" >{{team.coach}}</td>
            <td class="text-left d-none d-sm-table-cell" v-if="details==true">{{roundsName.slice(team.V)[0]}}</td>
            <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{team.TD}}</td>
            <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{team.S}}</td>
            <td class="text-center d-none d-sm-table-cell" v-if="details!=true && maxVictory==team.V">Qualifié</td>
            <td class="text-center d-none d-sm-table-cell" v-if="details!=true && maxVictory>team.V">En lice</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br/>
    <div v-if="details==true">
      <h3>Éliminés</h3>
      <table>
        <thead>
          <tr>
            <th class="text-left">Equipe</th>
            <th class="text-left d-none d-sm-table-cell">Coach</th>
            <th class="text-left" v-if="roundsCount==0">Tour</th>
            <th class="text-center d-none d-sm-table-cell">TD</th>
            <th class="text-center d-none d-sm-table-cell">S</th>
          </tr>
        </thead>
        <tbody class="table-hover">
          <tr v-for="team in losers"  :key="team.id" class="zelda" @click="goToTeam(team.cyanide_id)">
            <td class="text-left"><img :src="require('../assets/logos/Logo_'+team.logo+'.png')"> {{team.name}}</td>
            <td class="text-left d-none d-sm-table-cell" >{{team.coach}}</td>
            <td class="text-left d-none d-sm-table-cell" v-if="roundsCount==0" >{{roundsName.slice(team.V)[0]}}</td>
            <td class="text-center d-none d-sm-table-cell">{{team.TD}}</td>
            <td class="text-center d-none d-sm-table-cell">{{team.S}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'StandingSingleElimination',

    props: {
      competition: Object,
      details: Boolean,
      teamAccess: Boolean,
      roundsName: Array,
      roundsCount: Number
    },
    computed:{
      qualified() {
        return this.competition.standing.filter(team => team.D==0)
      },
      losers() {
        return this.competition.standing.filter(team => team.D==1)
      },
      maxVictory() {
        console.log(Math.max(this.qualified.map(team => team.V), 0));// eslint-disable-line no-console
        return 1
      }
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
</style>
