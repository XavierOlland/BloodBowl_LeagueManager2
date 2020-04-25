<template>
  <div id="Competition" class="view container">
    <Modal v-if="modal == true"/>
    <div class="row">
      <div class="col-lg-7">
        <div class="plain prime">
          <h2 v-if="competition.site_name==competition.season">{{competition.site_name}} </h2>
          <h2 v-else>{{competition.season}} - {{competition.site_name}} </h2>
          <h3>Classement </h3>
          <CompetitionStanding :competition="competition.standing" :details="true" :limit="100" :teamAccess="true"/>
          <Button v-if="user.coach.active==1 || admin==1" :id="'Maj'" :text="'Mettre à jour'" @clicked="competitionUpdate" />
        </div>
        <div class="card-columns">
          <Statistics class="d-none d-sm-flex" v-for="stat in competition.playersStats" :key="stat.type" :statistics="stat" :limit="3" :dictionnary="dictionnary"/>
        </div>
      </div>
      <div class="col-lg-5">
        <div v-for="day in calendar" :key="day.round" v-show="day.round <= displayDay || displayDay==0" class="day plain prime" :class="{ current: day.round == currentDay}">
          <div v-if="day.round == currentRound.currentDay && displayDay != 0" class="tab zelda" @click="fullCalendar()">Calendrier complet</div>
          <h3 v-if="competition.format!='single_elimination'">Journée {{day.round}}</h3>
          <h3 v-else>{{rounds[day.round-1]}} </h3>
          <div v-for="match in day.matchs" :key="match.id" :title="match.name_1 + ' VS ' + match.name_2" class="vs d-inline-flex col-md-6 col-xl-4">
            <MatchPreview :match="match" :round="day.round" :coach_id="user.coach.cyanide_id"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CompetitionStanding from '../components/CompetitionStanding.vue'
  import Statistics from '../components/Statistics.vue'
  import MatchPreview from '../components/MatchPreview.vue'
  import Modal from '../components/Modal.vue'
  import Button from '../components/ui/Button.vue';

  export default {
    name: 'Competition',
    components: {
      CompetitionStanding,
      Statistics,
      MatchPreview,
      Modal,
      Button
    },
    props: {
      dictionnary: Array
    },
    data(){
      return {
        admin: 0,
        saving: false,
        modal: false,
        displayDay: 0,
        singleEliminationRounds: ['32emes de finales', '16emes de finales', '8emes de finales', 'Quart de finales', 'Demi-Finales', 'Finale']
      }
    },
    computed:{
      user() {
        return this.$store.state.user;
      },
      competition(){
        return this.$store.state.competition.competition;
      },
      calendar(){
        const cal = this.$store.state.competition.calendar;
        this.competition.game=='BB1'? cal.reverse() : cal;
        return this.$store.state.competition.calendar;
      },
      currentRound(){
        const round = this.calendar.find(round => round.round === round.currentDay);
        return round;
      },
      rounds(){
        const rounds = this.singleEliminationRounds.slice(6 - this.calendar.length);
        this.competition.game=='BB1'? rounds.reverse() : rounds;
        return rounds;
      }
    },
    methods: {
      competitionUpdate() {
        this.saving = true;
        var params = [this.competition.game_name, this.competition.id, this.competition.format, this.currentRound.currentDay, this.currentRound.matchsToSave ];
        this.$store.dispatch('competition/updateCompetition',params);
      },
      fullCalendar() {
        this.displayDay = 0;
      }
    },
    mounted() {
      this.$store.dispatch('competition/fetchCompetition',this.$route.params.id);
    },
    watch: {
      calendar: function() {
        this.currentRound.currentDay = this.calendar[0].currentDay;
        this.displayDay = (this.calendar.length < 6 || !this.currentRound.currentDay) ? 0 : this.currentRound.currentDay;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .day {
    .tab {
      top: 0;
      right: 0;
      position: absolute;
    }
  }
  .vs {
    padding: 0.2em;
  }
  .card-columns {
    column-count: 2;
  }
  @media (min-width: 1300px) {
    .card-columns {
      column-count: 3;
    }
  }
  .current {
    background: $focus-bg;
  }
  .current h3 {
    color: $focus-color;
  }
  .card-columns .card {
    width: calc(100% - 20px);
  }

</style>
