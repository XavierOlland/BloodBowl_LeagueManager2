<template>
  <div id="MatchPreview" @click="matchDetails" class="match text-center" :class="{ zelda: match.cyanide_id }">
    <div>
      <img :src="require('../assets/logos/Logo_' + match.logo_1 + '.png')">
      <img class="versus" v-if="match.cyanide_id == null" src="../assets/elements/vs.png">
      <span class="score" v-else > <span :class="{'winner': match.score_1 >match.score_2 }">{{match.score_1}}</span> - <span :class="{'winner': match.score_1 < match.score_2 }">{{match.score_2}}</span> </span>
      <img :src="require('../assets/logos/Logo_' + match.logo_2 + '.png')">
    </div>
    <hr />
    <div>
      <p v-if="match.started">{{match.started | moment("add", "2 hours","D MMM HH:mm")}}</p>
      <datetime v-else-if="(!match.cyanide_id && (coach_id==match.coach_id_1 || coach_id==match.coach_id_2 || admin==1))"
        v-on:close="setMatchDate()"
        v-model="match.started"
        placeholder="Planifier"
        :type="'datetime'"
        :minute-step="15"
        :phrases="{ok: 'OK', cancel: 'Annuler'}"
        :zone="'UTC+2'"
        :value-zone="'UTC'"
      />
      <p v-else>à venir</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MatchPreview',
    props: {
      match: Object,
      round: Number,
      coach_id: String
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
  .match {
    width: 100%;
    color: $prime-text;
    vertical-align: middle;
    text-align: center;
    margin: 0.5rem 0;
    padding: 1rem 0.2rem !important;
    border-radius: 5px;
    border: 1px solid transparent;
    span {
      vertical-align: middle;
      display: inline-block;
    }
    img {
      width: 25%;
      max-width: 100px;
      height: 25%;
      display: inline;
      vertical-align: middle;
    }
    p {
      font-family: 'Muli';
      color: $prime-text;
      margin: 0;
    }
    hr {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      border-top: 1px solid $prime-color;
      width: 75%;
    }
    .score {
      font-family: 'Akashi';
      font-size: 1.3rem;
      line-height: 1.6rem !important;
      font-weight: 400;
      letter-spacing: -0.15rem;
      margin: 0 0.5rem;
    }
    .winner {
      color: $prime-color;
      font-size: 1.7rem;
    }

  }
  .match:hover {
    background: $prime-bg;
    border: 1px solid $prime-color;
    .winner {
      color: $prime-color;
    }
  }
  .current {
    hr {
      border-color: $link-contrast;
    }
    .winner {
      color: $link-contrast;
    }
    .match:hover{
      hr {
        border-color: $prime-color;
      }
    }
  }
</style>
