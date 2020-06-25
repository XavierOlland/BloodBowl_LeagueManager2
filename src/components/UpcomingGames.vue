<template>
  <div id="UpcomingGames" class="plain prime" v-if="games.length>0">
    <h2>Programme CabalVision</h2>
    <p v-if="games.length==0">Aucun match de programmé pour le moment.</p>
    <div class="row">
      <div :class="['day','col-12',{'col-lg-6': day.matchs.length==1}]" v-for="day in games" :key="day.day">
        <h3 class="col-12">{{day.day | moment('dddd D MMMM')}}</h3>
        <div class="row">
          <div :class="['col-12', {'col-lg-6': day.matchs.length>1}]" class="match" v-for="match in day.matchs" :key="match.id">
            <div class="hover-box">
              <div class="row">
                <div class="col-12 time">
                  <hr/>
                  <h4>{{match.planned | moment('HH:mm')}}</h4>
                  <hr/>
                </div>
              </div>
              <div class="row">
                <div class="col-5 text-center">
                  <img class="teamLogo" :src="'https://bbbl.fr/img/logos/Logo_' + match.logo_1 + '.png'">
                  <h4>{{match.name_1}}</h4>
                </div>
                <div class="col-2 align-self-center versus">
                  <img src="../assets/elements/vs.png">
                </div>
                <div class="col-5 text-center">
                  <img class="teamLogo" :src="'https://bbbl.fr/img/logos/Logo_' + match.logo_2 + '.png'">
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
  const moment = require('moment'); // eslint-disable-line

  export default {
    name: 'UpcomingGames',
    props: {
      games: Array
    }
  }
</script>

<style lang="scss" scoped>
  #UpcomingGames {
    padding-bottom: 15px;
  }
  .day {
    margin-bottom: 1rem;
    h3 {
      text-transform: capitalize;
      margin-bottom: 0.75em;
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
      width: 40%;
      height: auto;
    }
    .versus {
      padding: 0.1rem;
      img {
        width: 100%;
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
