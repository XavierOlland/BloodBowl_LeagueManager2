<template>
  <div id="Player">
    <div class="veil" v-show="modal == true" @click="modalView">
      <div class="plain seconde" :class="{ modal: modal == true }">
        <div id="fame"  class="teamBoard">
          <h4  class="star" >&#9733;</h4>
          <h4 class="noselect">{{player.xp}} XP</h4>

        </div>
        <h1>{{player.name}}</h1>
        <!--h2><span>{{player.position | talkingToTheGods()}}</span></h2-->
        <br>
        <div class="row">
          <div id="playerPhoto" class="col-xs-6 col-md-3">
            <img class="cover" src="resources/img/Cover_Glass.png">
            <!--img class="player" src="resources/players/{{modal.player.position}}.jpg"-->
          </div>
          <div class="col-xs-6 col-md-3">
            <h3>MV {{ player.attributes.ma }}</h3>
            <h3>FO {{ player.attributes.st }}</h3>
            <h3>AG {{ player.attributes.ag }}</h3>
            <h3>AR {{ player.attributes.av }}</h3>
          </div>
          <div class="col-xs-6 col-md-3">
            <h3>Compétences</h3>
            <p v-if="player.skills.length==0">Nada! Peau de zob! Ce joueur est un noob!</p>
            <ul>
             <!--li v-for="skill in player.skills" :key="skill">{{ skill | talkingToTheGods() }}</li>
            </ul>
          </div>
          <div class="col-xs-6 col-md-3">
            <h3>Blessures</h3>
            <p v-if="player.casualties.length==0">Aucune... C'est d'un triste...</p>
            <ul>
              <li v-for="casualty in player.casualties" :key="casualty">{{ casualty | talkingToTheGods() }}</li-->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Player',
    props: {
      player: Object
    },
    data() {
      return {
        modal: false
      }
    },
    computed: {
    },
    methods: {
      modalView() {
        this.modal = !this.modal;
      }
    },
    watch: {
      player: function() {
        this.modal = this.player.id > 0 ? true : false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .somethingOrNothingShows {

  }
</style>
