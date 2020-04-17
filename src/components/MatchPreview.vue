<template>
  <div id="MatchPreview" @click="matchDetails" class="vs match x-center" :class="{ zelda: match.cyanide_id }">
    <div>
      <p v-if="match.started">{{match.started | moment("add", "2 hours","D MMM HH:mm")}}</p>
      <datetime v-else-if="!match.started && admin==1"
        v-on:close="setMatchDate()"
        v-model="match.started"
        :type="'datetime'"
        :minute-step="15"
        :phrases="{ok: 'OK', cancel: 'Annuler'}"
        :zone="'UTC+2'"
        :value-zone="'UTC'"
      />
      <p v-else>A venir</p>

    </div>
    <div>
      <img :src="require('../assets/logos/Logo_' + match.logo_1 + '.png')">
      <img class="versus" v-if="match.cyanide_id == null" src="../assets/elements/vs.png">
      <span class="score" v-else > {{match.score_1}} - {{match.score_2}} </span>
      <img :src="require('../assets/logos/Logo_' + match.logo_2 + '.png')">
    </div>
    <!--div class="calendarOdds" v-if="round >= currentDay && betsAlreadyDone(match)" ng-bind-html="ratio(match)"></div>
    <div class="calendarBetsAd" v-if="round >= currentDay && !betsAlreadyDone(match)"><img class="betLogo" src="resources/bets/BetLogo.png"></div-->

  </div>
</template>

<script>
  export default {
    name: 'MatchPreview',
    props: {
      currentDay: Number,
      match: Object,
      round: Number
    },
    data(){
      return {
        admin: window.admin
      }
    },
    methods: {
      setMatchDate() {
        if(this.match.started){
          this.$store.dispatch('match/updateMatch', this.match);
        }
      },
      matchDetails() {
        if (this.match.cyanide_id) {
          this.$router.push({ name: 'Match', params: { id:this.match.id } })
        }
        /*else if (($rootScope.coach_cyanide_id == match.coach_id_1 || $rootScope.coach_cyanide_id == match.coach_id_2) && match.started == null) {
            //Set date
            //else bet functions
        }*/
      }
    }

  }
</script>

<style lang="scss" scoped>
  img {
    width: 40px;
    height: 40px;
    display: inline;
    vertical-align: middle;
  }
  .vs {
    width:100%;
    font-family: 'Muli';
    font-size: 20px;
    color: $prime-text;
    line-height: 24px !important;
    font-weight: 400;
    vertical-align: middle;
    text-align: center;
    margin: 10px 0 0;
    padding: 5px 0;
    border-radius: 5px;
    border:1px solid transparent;}
  .vs:hover {
    background: $prime-bg;
    border: 1px solid $prime-color;
  }
  p {
    margin-bottom: 0.5em;
    color: $prime-text;
  }
</style>
