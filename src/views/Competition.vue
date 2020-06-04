<template>
  <div id="Competition" class="view container" v-if="!isFetching">
    <Loader v-if="saving==true" :text="text"/>
    <Modal v-if="modal == true"/>
    <div class="row">
      <div class="col-lg-7">
        <div class="plain seconde banner">
          <h1 v-if="competition.site_name==competition.season">{{competition.site_name}} </h1>
          <h1 v-else>{{competition.season}} - {{competition.site_name}}</h1>
        </div>
        <Champion v-if="competition.champion==1 && competition.active==0"
          :mode="'card'"
          :competition="competition"
          :coach="competition.standing[0].coach"
          :team="competition.standing[0].name"
          :race="Number(competition.standing[0].race)"
          :logo="competition.standing[0].logo"
          :colours="[competition.standing[0].color_1,competition.standing[0].color_2]"
        />
        <div class="plain prime">
          <CompetitionStanding v-if="competition.format!='single_elimination'" :competition="competition" :details="true" :limit="100" :teamAccess="true"/>
          <StandingSingleElimination v-else :competition="competition" :details="true" :limit="100" :teamAccess="true" :roundsName="roundsName" :roundsCount="roundsCount"/>
          <Button v-if="user.coach.active==1 || admin==1" :id="'Maj'" :text="'Mettre à jour'" @clicked="competitionUpdate" />
        </div>
        <div class="card-columns">
          <Statistics class="d-none d-sm-flex" v-for="stat in competition.playersStats" :key="stat.type" :statistics="stat" :limit="3" :dictionnary="dictionnary"/>
        </div>
      </div>
      <div class="col-lg-5">
        <div v-for="day in calendar" :key="day.round" v-show="day.round <= displayDay || displayDay==0" class="day plain prime" :class="{ 'current': day.round == currentRound.currentDay}">
          <div v-if="day.round == currentRound.currentDay && displayDay != 0" class="tab zelda" @click="fullCalendar()">Calendrier complet</div>
          <h3 v-if="competition.format!='single_elimination'">Journée {{day.round}}</h3>
          <h3 v-else>{{roundsName[day.round-1]}} </h3>
          <div v-for="match in day.matchs" :key="match.id" :title="match.name_1 + ' VS ' + match.name_2" class="vs d-inline-flex col-md-6 col-xl-4">
            <MatchPreview :match="match" :round="day.round" :coach_id="user.coach.cyanide_id"/>
          </div>
        </div>
      </div>
    </div>
    <Button :id="'Back'" :back="true" @clicked="$router.go(-1)"/>
  </div>
</template>

<script>
  import Champion from '../components/Champion.vue'
  import CompetitionStanding from '../components/CompetitionStanding.vue'
  import StandingSingleElimination from '../components/StandingSingleElimination.vue'
  import Statistics from '../components/Statistics.vue'
  import MatchPreview from '../components/MatchPreview.vue'
  import Modal from '../components/Modal.vue'
  import Button from '../components/ui/Button.vue';
  import Loader from '../components/ui/Loader.vue';

  export default {
    name: 'Competition',
    components: {
      Champion,
      CompetitionStanding,
      StandingSingleElimination,
      Statistics,
      MatchPreview,
      Modal,
      Button,
      Loader
    },
    props: {
      dictionnary: Array
    },
    data(){
      return {
        isFetching: true,
        admin: 0,
        saving: false,
        modal: false,
        displayDay: 0,
        currentRound: 1,
        singleEliminationRounds: ['32emes de finales', '16emes de finales', '8emes de finales', 'Quart de finales', 'Demi-Finales', 'Finale'],
        text: 'Consignation dans les registres...',
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
        //this.competition.game=='BB1'? cal.reverse() : cal;
        return cal;
      }
    },
    methods: {
      competitionUpdate() {
        this.saving = true;
        var params = [this.competition.game_name, this.competition.id, this.competition.format, this.currentRound.currentDay, this.currentRound.matchsToSave ];
        this.$store.dispatch('competition/updateCompetition',params).then(() => {
          this.saving = false;
        });
      },
      fullCalendar() {
        this.displayDay = 0;
      },
      setRounds(games) {
        //case for hand made competitions
        var sliceLimit = this.competition.rounds_count ? 6 - this.competition.rounds_count : 6 - this.currentRound.currentRound;
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
        this.competition.game=='BB1'? rounds.reverse() : rounds;
        this.roundsName = rounds;
      }
    },
    async mounted() {
      await this.$store.dispatch('competition/fetchCompetition',this.$route.params.id);
      await this.$store.dispatch('competition/fetchCalendar',this.$route.params.id);

    },
    watch: {
      calendar: function() {
        this.displayDay = (this.calendar.length < 5 || !this.currentRound.currentDay || this.competition.format=='single_elimination') ? 0 : this.currentRound.currentDay;
        this.currentRound = this.$store.state.competition.calendar.find(day => day.round == day.currentRound);
        this.setRounds(this.calendar.find(day => day.round == 1).matchs.length);
      },
      competition: function() {
        this.isFetching = this.competition.length==0 ? true : false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .banner {
    padding-bottom: 10px;
    h1 {
      text-align:center;
    }
  }
  .day {
    padding-bottom: 15px;
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
    .card {
      margin: 20px;
      width: calc(100% - 20px);
    }
  }
  @media (max-width: 700px), (min-width: 992px) and (max-width: 1200px) {
    .card-columns {
      column-count: 1;
    }
  }
  @media (min-width: 1800px) {
    .card-columns {
      column-count: 3;
    }
  }
  .current {
    background: $focus-bg;
    border-color: $prime-bg;
    h3 {
      color: $focus-color;
    }
  }
</style>
