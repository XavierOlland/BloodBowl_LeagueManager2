<template>
  <div id="MatchPreview" @click="matchDetails" class="vs match x-center" :class="{ zelda: match.cyanide_id }">
    <div>
      <p v-if="match.started">{{match.started | moment("add", "2 hours","D MMM HH:mm")}}</p>
    <datetime v-else-if="(!match.cyanide_id && (coach_id==match.coach_id_1 || coach_id==match.coach_id_2 || admin==1))"
        v-on:close="setMatchDate()"
        v-model="match.started"
        placeholder="À venir"
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
  </div>
</template>

<script>
  export default {
    name: 'MatchPreview',
    props: {
      match: Object,
      round: Number,
      coach_id: Number
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
          //Match is played : show match
          this.$router.push({ name: 'Match', params: { id:this.match.id } })
        }
        else if (this.coach_id==this.match.coach_id_1 || this.coach_id==this.match.coach_id_2 || this.admin==1) {
          //Match not played & user is a player or an admin: set date
          this.$refs.dateTime.focus();
        }
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
