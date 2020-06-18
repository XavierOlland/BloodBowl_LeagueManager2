<template>
  <div id="StandingSingleElimination">
    <div class="winner" v-if="details==false && qualified.length==1">
      <br/>
      <h3>vainqueur</h3>
      <hr>
      <h1>{{qualified[0].name}}</h1>
      <h5>{{qualified[0].race | talkingToTheGods()}}</h5>
      <hr>
      <h2>{{qualified[0].coach}}</h2>
    </div>
    <div v-if="competition.active==1 && qualified.length>1">
      <h3 v-if="details==true">En lice</h3>
      <table>
        <thead>
          <tr>
            <th class="text-left">Equipe</th>
            <th class="text-left d-none d-md-table-cell">Race</th>
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
            <td class="text-left d-none d-md-table-cell" >{{team.race | talkingToTheGods()}}</td>
            <td class="text-left d-none d-sm-table-cell" >{{team.coach}}</td>
            <td class="text-left d-none d-sm-table-cell" v-if="details==true">{{roundsName.slice(team.V)[0]}}</td>
            <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{team.TD}}</td>
            <td class="text-center d-none d-sm-table-cell" v-if="details==true">{{team.S}}</td>
            <td class="text-center d-none d-sm-table-cell" v-if="details!=true && maxVictory==team.V">Qualifié</td>
            <td class="text-center d-none d-sm-table-cell" v-if="details!=true && maxVictory>team.V">En lice</td>
          </tr>
        </tbody>
      </table>
      <br v-if="details==true"/>
    </div>

    <div v-if="details==true">
      <h3>Éliminés</h3>
      <table>
        <thead>
          <tr>
            <th class="text-left">Equipe</th>
            <th class="text-left d-none d-md-table-cell">Race</th>
            <th class="text-left d-none d-sm-table-cell">Coach</th>
            <th class="text-left" v-if="!roundsCount">Tour</th>
            <th class="text-center d-none d-sm-table-cell">TD</th>
            <th class="text-center d-none d-sm-table-cell">S</th>
          </tr>
        </thead>
        <tbody class="table-hover">
          <tr v-for="team in losers"  :key="team.id" class="zelda" @click="goToTeam(team.cyanide_id)">
            <td class="text-left"><img :src="require('../assets/logos/Logo_'+team.logo+'.png')"> {{team.name}}</td>
            <td class="text-left d-none d-md-table-cell" >{{team.race | talkingToTheGods()}}</td>
            <td class="text-left d-none d-sm-table-cell" >{{team.coach}}</td>
            <td class="text-left d-none d-sm-table-cell" v-if="!roundsCount" >{{roundsName.slice(team.V)[0]}}</td>
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
        return this.competition.standing.filter(team => team.D==0);
      },
      losers() {
        return this.competition.standing.filter(team => team.D==1);
      },
      maxVictory() {
        return this.competition.lastRound;
      }
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
  .winner{
    h1,h2,h3 {
      text-align: center;
    }
    hr {
      width: 80%;
      border-top: 1px solid #ffffff;
      text-align: center;
      margin: 10px auto;
    }
  }
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
