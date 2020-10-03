<template>
  <div id="LastGames" class="plain" :class="level" v-if="games.length>0">
    <h2>{{ games.length | pluralize(['Dernière rencontre', 'Dernières rencontres']) }} </h2>
    <div class="row d-flex justify-content-center">
      <div :class="['col-12', {'col-xxl-6': games.length>1}]" class="match zelda" v-for="match in limitBy(orderBy(games,'played',-1), limit)" :key="match.id" @click="matchDetails(match.id)">
        <div class="hover-box">
          <div class="row">
            <div class="col-12 time">
              <hr/>
              <h4>{{match.played | moment('dddd D MMMM HH:mm')}}</h4>
              <hr/>
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-right">
              <img class="teamLogo" :src="'https://bbbl.fr/img/logos/Logo_' + match.logo_1 + '.png'">
            </div>
            <div class="col-4 align-self-center text-center">
              <span class="score">
                <span :class="{'winner': match.score_1 > match.score_2 }">{{match.score_1}}</span> - <span :class="{'winner': match.score_1 < match.score_2 }">{{match.score_2}}</span>
              </span>
            </div>
            <div class="col-4 text-left">
              <img class="teamLogo" :src="'https://bbbl.fr/img/logos/Logo_' + match.logo_2 + '.png'">
            </div>
          </div>
          <div class="row">
            <div class="col-6 text-center"><h4>{{match.name_1}}</h4></div>
            <div class="col-6 text-center"><h4>{{match.name_2}}</h4></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue2Filters from 'vue2-filters'

  const moment = require('moment'); // eslint-disable-line

  export default {
    name: 'UpcomingGames',
    props: {
      games: Array,
      limit: Number,
      level: String
    },
    mixins: [Vue2Filters.mixin],
    methods: {
      matchDetails(id) {
        this.$router.push({ name: 'Match', params: { id:id } })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #LastGames {
    padding-bottom: 15px;
  }
  .match {
    padding: 0 0.25rem;
    vertical-align: middle;
    span {
      vertical-align: middle;
      display: inline-block;
    }
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
        text-transform: capitalize;
        display: inline-flex;
      }
    }
    .teamLogo {
      width: 50%;
      height: auto;
    }
    .hover-box {
      margin: 0.5rem;
      padding: 0.25rem;
      border: 1px solid transparent;
      border-radius: 3px;
    }
  }
  .prime .hover-box:hover {
    background: $prime-bg;
    border: 1px solid $prime-color;
  }
  .seconde .hover-box:hover {
    background: $seconde-bg;
    border: 1px solid $seconde-color;
  }
  .score {
    font-family: 'Akashi';
    font-size: 2rem;
    line-height: 2.3rem !important;
    font-weight: 400;
    letter-spacing: -0.15rem;
    margin: 0 0.5rem;
    color: $prime-text;
  }
  .prime .winner {
    color: $prime-color;
    font-size: 2.3rem;
  }
  .seconde .winner {
    color: $seconde-color;
    font-size: 2.3rem;
  }
</style>
