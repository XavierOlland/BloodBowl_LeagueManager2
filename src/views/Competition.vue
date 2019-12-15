<template>
  <div id="Competition" class="view container">
    <Modal v-if="modal == true"/>
    <div class="row">
      <div class="col-lg-7">
        <div class="plain prime">
          <h2>Classement</h2>
          <CompetitionStanding :competition="competition.standing" :details="true" :limit="100"/>
          <Button :id="'Maj'" :text="'Mettre à jour'" @clicked="competitionUpdate" />

        </div>
        <div class="card-columns">
          <Statistics  v-for="stat in competition.playersStats" :key="stat.type" :statistics="stat" :limit="3" :dictionnary="dictionnary"/>
        </div>
      </div>
      <div class="col-lg-5">
        <div v-for="day in calendar" :key="day.round" v-show="day.round <= displayDay || displayDay==0" class="plain prime" :class="{ current: day.round == currentDay}">
          <div v-if="day.round == currentDay && displayDay != 0" class="topright zelda" @click="fullCalendar()">Calendrier complet</div>
          <h3>Journée {{day.round}}</h3>
          <div v-for="match in day.matchs" :key="match.id" :title="match.name_1 + ' VS ' + match.name_2" class="vs d-inline-flex col-lg-6 col-xl-4">
            <MatchPreview :match="match" :round="day.round" />
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
      Button
    },
    props: {
      dictionnary: Array
    },
    data(){
      return {
        admin: 0,
        matchesToSave: [],
        saving: false,
        modal: false,
        currentDay: 0,
        displayDay: 0
      }
    },
    computed:{
      competition(){
        return this.$store.state.competition.competition;
      },
      calendar(){
        return this.$store.state.competition.calendar;
      },
      currentDay(){
        return this.calendar[0].currentDay
      }
    },
    methods: {
      competitionUpdate() {
        this.saving = true;
        var params = [this.competition.game_name, this.competition.id,];
        this.$store.dispatch('competition/updateCompetition',params)
      },
      fullCalendar() {
        this.displayDay = 0;
      }
    },
    mounted() {
      this.$store.dispatch('competition/fetchCompetition',this.$route.params.id)
    },
    watch: {
      calendar: function() {
        this.currentDay = this.calendar[0].currentDay;
        this.displayDay = (this.calendar.length < 6 || !this.currentDay) ? 0 : this.currentDay;
      }
    }
  }
</script>

<style lang="scss" scoped>
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
