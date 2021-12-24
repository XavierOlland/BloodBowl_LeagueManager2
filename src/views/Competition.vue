<template>
  <div id="Competition" class="view container">
    <Loader v-if="saving==true || isFetching" :text="isFetching? chargingText : savingText"/>
    <Modal v-if="modal == true"/>
    <div class="row no-gutters">
      <div class="col-lg-7">
        <div class="plain seconde banner">
          <h1 v-if="competition.site_name==competition.season">{{competition.site_name}} </h1>
          <h1 v-else>{{competition.season}} - {{competition.site_name}}</h1>
        </div>
        <Champion v-if="hasChampion==true"
          :mode="'card'"
          :competition="competition"
          :coach="competition.standing[0].coach_name"
          :team="{id:competition.standing[0].team_cyanide_id, name:competition.standing[0].team_name}"
          :race="Number(competition.standing[0].team_race)"
          :logo="competition.standing[0].team_logo"
          :colours="JSON.parse(competition.standing[0].team_colors)"
        />
        <div class="plain prime">
          <CompetitionStanding v-if="competition.format!='single_elimination'" :competition="competition" :details="true" :limit="100" :teamAccess="true"/>
          <StandingSingleElimination v-else :competition="competition" :details="true" :limit="100" :teamAccess="true" :roundsName="roundsName" :roundsCount="competition.matchday"/>
          <Button v-if="competition.active==1" :id="'Maj'" :text="'Mettre à jour'" @clicked="competitionUpdate" />

        </div>
        <div class="card-columns">
          <Statistics class="card-holder" v-for="stat in competition.playersStats" :key="stat.type" :statistics="stat" :limit="3" :dictionnary="dictionnary"/>
        </div>
      </div>
      <div class="col-lg-5">
        <div v-for="day in calendar"
        :key="day.round"
        v-show="day.round <= displayLimit || displayLimit==0"
        class="day plain prime"
        :class="{ 'current': day.round == competition.matchday && competition.active==1 && competition.format != 'ladder'}">
          <div
          v-if="day.round == competition.matchday && displayLimit != 0 && calendar.length!=competition.matchday" class="tab zelda" @click="fullCalendar()">Calendrier complet</div>
          <h3 v-if="competition.format == 'single_elimination'">{{roundsName[day.round-1]}}</h3>
          <h3 v-else-if="competition.format == 'ladder'">Rencontres</h3>
          <h3 v-else>Journée {{day.round}}</h3>
          <div v-for="match in orderBy(day.matchs,'started',-1)" :key="match.id" :title="match.name_1 + ' VS ' + match.name_2" class="vs d-inline-flex col-md-6 col-xl-4">
            <MatchPreview :match="match" :round="day.round" :coach_id="user.coach.cyanide_id" :archived="!competition.active"/>
          </div>
        </div>
      </div>
    </div>
    <Button :id="'Back'" :type="'back'" @clicked="$router.go(-1)"/>
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

  import Vue2Filters from 'vue2-filters'

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
    mixins: [Vue2Filters.mixin],
    props: {
      dictionnary: Array
    },
    data() {
      return {
        isFetching: true,
        admin: 0,
        hasChampion: false,
        saving: false,
        modal: false,
        displayLimit: 0,
        currentRound: {},
        singleEliminationRounds: ['32emes de finales', '16emes de finales', '8emes de finales', 'Quart de finales', 'Demi-Finales', 'Finale'],
        roundsName: ['32emes de finales', '16emes de finales', '8emes de finales', 'Quart de finales', 'Demi-Finales', 'Finale'],
        savingText: 'Consignation dans les registres...',
        chargingText: 'Chargement de la competition...'
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      competition() {
        return this.$store.state.competition.competition;
      },
      calendar() {
        const cal = this.$store.state.competition.calendar;
        this.competition.game=='BB1'? cal.reverse() : cal;
        return cal;
      }
    },
    methods: {
      async competitionUpdate() {
        this.saving = true;
        var params = [this.competition.game_name, this.competition.id, this.competition.format, this.competition.matchday, this.currentRound.matchsToSave ];
        await this.$store.dispatch('competition/updateCompetition',params).then(() => {
          this.saving = false;
        });
        this.$store.dispatch('competition/fetchCalendar',this.$route.params.id);
      },
      fullCalendar() {
        this.displayLimit = 0;
      },
      setRounds(games) {
        //case for hand made competitions
        var sliceLimit = 6 - this.competition.matchday;
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
      },
      setChampion() {
        if(this.competition.champion==1){
          if(this.competition.active==1){
            switch(this.competition.format){
              case 'single_elimination':
                this.hasChampion = this.competition.standing.filter(team => team.loss==0).length==1? true : false;
                break
              case 'ladder':
                this.hasChampion = false;
                break;
              default:
                this.hasChampion = this.competition.matchsLeft == 0 ? true : false;
                break;
            }
          }
          else{
            this.hasChampion = true;
          }
        }
        else{
          this.hasChampion = false;
        }
      }
    },
    async mounted() {
      await this.$store.dispatch('competition/fetchCompetition',this.$route.params.id);
      await this.$store.dispatch('competition/fetchCalendar',this.$route.params.id);
    },
    watch: {
      calendar: function() {
        this.displayLimit = (this.calendar.length <= 5 || this.competition.format=='ladder' || this.competition.active==0 || this.competition.format=='single_elimination') ? 0 : this.competition.matchday;
        if(this.calendar.length>0){
          this.currentRound = this.$store.getters['competition/getRound'](this.competition.matchday);
          this.setRounds(this.calendar.find(day => day.round == 1).matchs.length);
          this.setChampion();
        }
      },
      competition: function() {
        this.isFetching = this.competition.length==0 ? true : false;
        this.setChampion();
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
  .tab {
    color: $seconde-text;
    font-weight: normal;
  }
</style>
