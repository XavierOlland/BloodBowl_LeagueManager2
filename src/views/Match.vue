<template>
  <div id="Match" class="view container" v-if="!isFetching">
    <div class="row adapt">
      <div class="col-md-3"></div>
      <div class="col-md-6" @click="previousPage()">
        <div class="plain header seconde text-center stadium zelda" :style="{ background: `url(${stadiumImage}) center center`, backgroundSize: 'cover'}">
          <h4>{{match.leaguename}}</h4>
          <h3>{{match.competitionname}}</h3>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-1 topright" :class="{tab : admin==1}">
        <div class="label" @click="matchReset()" v-if="admin==1">Reset</div>
      </div>
      <div class="col-md-1 topright" :class="{tab : coach_id==metadata.coach_id_1 || coach_id==metadata.coach_id_2 || admin==1}">
        <a href="" v-if="coach_id==match.coach_id_1 || coach_id==metadata.coach_id_2 || admin==1">
          <div class="label">Poster</div>
        </a>
      </div>
    </div>
    <div class="row adapt">
      <div class="col-md-6">
        <Helmet class="helmet left" :race="match.teams[0].idraces" :logo="match.teams[0].teamlogo" :colours="[metadata.team_1_color_1,metadata.team_1_color_2]" />
        <div class="plain prime content noselect text-right" :style="{'border-color': metadata.team_1_color_1}">
          <h2 class="zelda" :style="{color: metadata.team_1_color_1}" @click="$router.push({ name: 'Team', params: { id: match.teams[0].idteamlisting }})">{{match.teams[0].teamname}}</h2>
          <div class="scoreBoard">
            <div class="teamBoard">
              <h3>coaché par <span :style="{color: metadata.team_1_color_1}">{{match.coaches[0].coachname}}</span></h3>
              <h3>TV <span :style="{color: metadata.team_1_color_1}">{{match.teams[0].value}}</span></h3>
              <h3>
                <div v-for="i in match.teams[0].popularitybeforematch" class="star" :style="{color: metadata.team_1_color_1}">&#9733;</div>
                <span v-if="match.teams[0].popularitygain"> + <div class="star">&#9733;</div></span>
              </h3>
            </div>
            <div class="score" :style="{color: metadata.team_1_color_1}">{{match.teams[0].score}}</div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <Helmet class="helmet right" :race="match.teams[1].idraces" :logo="match.teams[1].teamlogo" :colours="[metadata.team_2_color_1,metadata.team_2_color_2]" />
        <div class="plain prime content noselect text-left" :style="{'border-color': metadata.team_2_color_1}">
          <h2 class="zelda" :style="{color: metadata.team_2_color_1}" @click="$router.push({ name: 'Team', params: { id: match.teams[1].idteamlisting }})">{{match.teams[1].teamname}}</h2>
          <div class="scoreBoard">
            <div class="score" :style="{color: metadata.team_2_color_1}">{{match.teams[1].score}}</div>
            <div class="teamBoard">
              <h3>coaché par <span :style="{color: metadata.team_2_color_1}">{{match.coaches[1].coachname}}</span></h3>
              <h3>TV <span :style="{color: metadata.team_2_color_1}">{{match.teams[1].value}}</span></h3>
              <h3>
                <div v-for="i in match.teams[1].popularitybeforematch" class="star" :style="{color: metadata.team_2_color_1}">&#9733;</div>
                <span v-if="match.teams[1].popularitygain"> + <div class="star">&#9733;</div></span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row adapt">
      <div class="col-md-4">
        <MatchTeamStats :colours="[metadata.team_1_color_1]" :team="match.teams[0]"/>
      </div>
      <div class="col-md-4 d-none d-md-block">
        <div class="plain seconde text-center stadium" :style="{ background: `url(${stadiumImage}) center center`, backgroundSize: 'cover'}">
          <h3>{{match.started| moment("D MMM HH")}}H</h3><br />
          <h4>Stade</h4>
          <h3>{{metadata.stadium}}</h3><br />
          <h4>Arbitre</h4>
          <h3>M. Squig</h3><br />
          <h4>Supporters</h4>
          <h3>{{match.teams[0].nbsupporters+match.teams[1].nbsupporters}}</h3><br />
        </div>
      </div>
      <div class="col-md-4">
        <MatchTeamStats :colours="[metadata.team_2_color_1]" :team="match.teams[1]"/>
      </div>
    </div>
  </div>
</template>

<script>
  const moment = require('moment')
  import MatchTeamStats from '../components/match/TeamStats.vue';
  import Helmet from '../components/ui/Helmet.vue';

  export default {
    name: 'Match',
    components: {
      MatchTeamStats,
      Helmet
    },
    data(){
      return {
        isFetching: true,
        admin: 0,
        coach_id: 1
      }
    },
    computed:{
      match() {
        return this.$store.state.match.match;
      },
      metadata() {
        return this.$store.state.match.metadata;
      },
      stadiumImage() {
        return require('../assets/stadiums/'+ this.match.stadium + '.png')
      }
    },
    mounted() {
      this.$store.dispatch('match/fetchMatch',this.$route.params.id)
    },
    watch: {
      match: function() {
        this.isFetching = this.match.length>0? true : false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scoreBoard {
    display: inline-flex;
    .score {
      align-self: flex-end;
      padding: 0 20px;
      font-family: 'Akashi';
      font-size: 120px;
      text-shadow: $prime-text -2px -2px, $prime-text 2px 2px, $prime-text 2px -2px, $prime-text -2px 2px;
    }
  }
  .teamBoard {
    text-shadow: 0 2px 5px $shadow;
    h3 {
      color: $prime-text;
      font-family: "Muli";
      span {
        font-family: 'Akashi';
      }
    }
  }
  .stadium {
    h3,h4 {
      text-shadow: 0 2px 5px $shadow;
    }
  }
  .helmet {
    position: absolute;
    bottom:0;
    width:300px;
    height:300px;
    z-index:2;
  }
  .left {
    transform: rotateY(180deg);
  }
  .right {
    right:0;
  }
  @media (max-width: 1439px) {
    .helmet {
      bottom:-35px;
      width:250px;
      height:250px;
    }
  }
  @media (max-width: 1200px) {
    .helmet {
      width:175px;
      height:175px;
    }
  }
</style>
