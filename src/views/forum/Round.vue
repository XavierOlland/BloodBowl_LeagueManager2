<template>
  <div id="ForumRound" class="view container" v-if="!isFetching">
    <div class="row adapt">
      <div class="col-md-3"></div>
      <div class="col-md-6" @click="goToCompetition">
        <div class="plain header seconde text-center stadium zelda"
        :style="{ background: `url(${stadiumImage}) center center,rgba(68,68,68,0.9)`, backgroundSize: 'cover'}">
          <h4>{{competition.season}}</h4>
          <h3>{{competition.site_name}}</h3>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
    <div class="row adapt">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="plain prime text-center">
          <h2 v-if="competition.format!='single_elimination'">Journée {{day.round}}</h2>
          <h2 v-else>{{roundsName[0]}}</h2>
          <div class="match" v-for="match in day.matchs" :key="match.id">
            <div class="hover-box">
              <div class="row">
                <div class="col-5 text-center">
                  <img class="teamLogo" :src="require('../../assets/logos/Logo_' + match.logo_1 + '.png')">
                  <h4>{{match.name_1}}</h4>
                </div>
                <div class="col-2 align-self-center text-center versus">
                  <img src="../../assets/elements/vs.png">
                </div>
                <div class="col-5 text-center">
                  <img class="teamLogo" :src="require('../../assets/logos/Logo_' + match.logo_2 + '.png')">
                  <h4>{{match.name_2}}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'ForumRound',
    components: {
    },
    data(){
      return {
        isFetching: true,
        round: this.$route.params.id.substr(this.$route.params.id.indexOf('_')+1,this.$route.params.id.length+1),
        singleEliminationRounds: ['32emes de finales', '16emes de finales', '8emes de finales', 'Quart de finales', 'Demi-Finales', 'Finale'],
        roundsName: ['32emes de finales', '16emes de finales', '8emes de finales', 'Quart de finales', 'Demi-Finales', 'Finale'],
      }
    },
    computed:{
      competition(){
        return this.$store.state.competition.competition;
      },
      day(){
        const day = this.$store.state.competition.calendar.find(day => day.round == this.round);
        return day;
      },
      stadiumImage() {
        return require('../../assets/stadiums/Human.png')
      }
    },
    async mounted() {
      var competition_id = this.$route.params.id.substr(0, this.$route.params.id.indexOf('_'));
      await this.$store.dispatch('competition/fetchCompetition',competition_id);
      await this.$store.dispatch('competition/fetchCalendar',competition_id);
    },
    methods:{
      goToCompetition(){
        window.open("http://bbbl.fr/#/competition/" + this.competition.id, "_blank" )
      },
      setRounds(games) {
        //case for hand made competitions
        var sliceLimit = this.competition.rounds_count ? 6 - this.competition.rounds_count : 6 - this.round;
        switch(games){
          case 2:
            sliceLimit = 4;
            break;
          case 4:
            sliceLimit = 3;
            break;
          case 8:
            sliceLimit = 2;
            break;
          case 16:
            sliceLimit = 1;
            break;
        }
        const rounds = this.singleEliminationRounds.slice(sliceLimit);
        this.roundsName = rounds;
      },
    },
    watch: {
      day: function() {
        this.isFetching = this.competition.length>0? true : false;
        this.setRounds(this.day.matchs.length);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .prime {
    border-top: 1px solid $prime-color;
    h2 {
      color: $prime-color;
    }
  }
  .header {
    padding-bottom: 10px;
    h3,h4 {
      text-shadow: 0 2px 5px $shadow;
    }
  }

  .match {
    padding: 0 0.25rem;
    .time {
      width: 100%;
      display: flex;
      align-items: stretch;
      border:none;
      hr {
        flex-grow: 1;
        margin: 0.55rem;
        border-bottom: solid 1px $prime-text;
      }
      h4 {
        display: inline-flex;
      }
    }
    .teamLogo {
      width: 25%;
      height: auto;
    }
    .versus {
      padding: 0.1rem;
      img {
        width: 60%;
      }
    }
    .hover-box {
      margin: 0.5rem;
      padding: 0.25rem;
      border: 1px solid transparent;
      border-radius: 3px;
    }
  }
  .hover-box:hover {
    background: $prime-bg;
    border: 1px solid $prime-color;
  }
</style>
