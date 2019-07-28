<template>
  <div id="Competition" class="view container">
    <Modal v-if="modal == true"/>
    <div class="row">
      <div class="col-lg-7">
        <div class="plain prime">
          <h2>Classement</h2>
          <CompetitionStanding :competition="competition.standing" :details="true" :limit="10"/>
          <div class="spacer"></div>
          <div class="button" @click="competitionUpdate">
            Mettre à jour
          </div>
        </div>
        <div class="card-columns">
          <Statistics  v-for="stat in competition.playersStats" :key="stat.type" :statistics="stat" :limit="3" :dictionnary="dictionnary"/>
        </div>
      </div>
      <div class="col-lg-5">
        <div v-for="day in calendar" :key="day.round" v-show="day.round <= displayDay || displayDay==0" class="plain prime" :class="{ current: day.round == currentDay}">
          <div v-if="day.round == currentDay && displayDay != 0" class="topright zelda" v-on:click="fullCalendar()">Calendrier complet</div>
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

  export default {
    name: 'Competition',
    components: {
      CompetitionStanding,
      Statistics,
      MatchPreview
    },
    props: {
      dictionnary: Array
    },
    data(){
      return {
        admin: 0,
        competition: {},
        calendar: [],
        displayDay: 0,
        matchesToSave: [],
        saving: false,
        modal: false
      }
    },
    methods: {
      competitionFetch() {
        this.$http.post('http://bbbl.fr/backend/vue-routes.php?action=competition', { id: this.$route.params.id }, { headers: { "content-type": "application/x-www-form-urlencoded" } }).then( response => {
          this.competition = response.data;
          if (this.competition.format == 'Sponsors') {
            //$scope.sponsorsCalendarUpdate(competition)
          } else {
            this.competitionCalendar();
          }
        }, error => {
          console.error(error);
        });
      },
      competitionCalendar() {
        this.$http.post('http://bbbl.fr/backend/vue-routes.php?action=competitionCalendar', [this.$route.params.id ], { headers: { "content-type": "application/x-www-form-urlencoded" } }).then( response => {
          this.calendar = response.data.slice().reverse();
          /*if (competition.competition_mode == 'Coupe') {
            $scope.finals = $rootScope.finalsTemplate;
            $scope.finals.splice($scope.calendar.length);
            $scope.finals.reverse();
          };*/
          //Si la saison est finie ou fait moins de 6 journées on affiche la totalité du calendrier
          this.currentDay = this.calendar[0].currentDay;
          this.displayDay = (this.calendar.length < 6 || !this.currentDay) ? 0 : this.currentDay

          if (this.competition.format != 'ladder') {
            for (var i = 0; this.calendar.length > i; i++) {
              var matches = this.calendar[i].matchs;
              for (var j = 0; matches.length > j; j++) {
                if (matches[j].cyanide_id == null) {
                  this.matchesToSave.push(matches[j].contest_id)
                }
              }
            }
          }
          this.saving = false;
        });
      },
      competitionUpdate() {
        this.saving = true;
        var params = [window.Cyanide_Key, window.Cyanide_League, this.competition.game_name, this.competition.id, this.matchesToSave, this.competition.format, this.currentDay];
        this.$http.post('http://bbbl.fr/backend/vue-routes.php?action=competitionUpdate', params)
          .then(response => {
            competitionFetch();
        });
      },
      fullCalendar() {
        this.displayDay = 0;
      }
    },
    mounted() {
      this.competitionFetch();
    }
  }
</script>

<style lang="scss" scoped>
  .vs {
    padding: 0;
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
    background: var(--focus-bg);
  }
  .current h3 {
    color: var(--focus-contrast);
  }
  .card-columns .card {
    width: calc(100% - 20px);
  }

</style>
