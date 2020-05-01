<template>
  <div id="Player" v-if="modal">
    <div class="veil" @click="modalView">
      <div class="plain seconde" :class="{ modal: modal == true }"  :style="{'border-color': colours[1]}">
        <div class="row">
          <div id="playerPhoto" class="photo col-md-3 d-none d-md-block">
            <img :src="require('../assets/players/'+player.position+'.jpg')" />
          </div>
          <div class="col-6 col-md-9">
            <div class="row">
              <div class="col-12 col-md-12">
                <h1 :style="{'color':colours[1]}">{{player.name}}</h1>
                <h2>{{ player.position | talkingToTheGods() }}</h2>
                <div class="level">
                  <h3 :style="{'color':colours[1]}" v-for="n in player.level" :key="n" class="star" >&#9733;</h3>
                  <h3 :style="{'color':colours[1]}" class="noselect"> {{player.xp}} XP</h3>
                </div>
                <br/>
              </div>
            </div>
            <div class="row">
              <div class="col-3 col-md-2 attributes">
                <h3 :style="{'color':colours[1]}">MV <span>{{ JSON.parse(player.attributes).ma }}</span></h3>
                <h3 :style="{'color':colours[1]}">FO <span>{{ JSON.parse(player.attributes).st }}</span></h3>
                <h3 :style="{'color':colours[1]}">AG <span>{{ JSON.parse(player.attributes).ag }}</span></h3>
                <h3 :style="{'color':colours[1]}">AR <span>{{ JSON.parse(player.attributes).av }}</span></h3>
              </div>
              <div class="col-5 col-md-5">
                <h3 :style="{'color':colours[1]}">Compétences</h3>
                <p v-if="JSON.parse(player.skills).length==0">Nada! Peau de zob! Ce joueur est un noob!</p>
                <ul>
                  <li v-for="skill in JSON.parse(player.skills)" :key="skill">
                    {{ skill | talkingToTheGods() }}
                  </li>
                </ul>
              </div>
              <div class="col-4 col-md-5">
                <h3 :style="{'color':colours[1]}">Blessures</h3>
                <p v-if="JSON.parse(player.casualties).length==0">Aucune... C'est d'un triste...</p>
                <ul>
                  <li v-for="casualty in JSON.parse(player.casualties)" :key="casualty">
                    {{ casualty | talkingToTheGods() }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Button :id="'ClosePlayer'" :text="'Fermer'" :color="colours[1]" @clicked="modalView" />
      </div>
    </div>
  </div>
</template>

<script>

  import Button from '../components/ui/Button.vue';

  export default {
    name: 'Player',
    components:{
      Button
    },
    props: {
      player: Object,
      colours: Array,
    },
    data() {
      return {
        modal: false
      }
    },
    methods: {
      modalView() {
        this.$emit('clicked')
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
  h3 {
    span {
      color: $prime-text;
    }
  }
  #Player {
    .veil {
      .plain {
        height: auto;
              }
    }
    .row {
      div {
        padding:0;
      }
    }
  }
  .level {
    position: absolute;
    right:0;
    top:0;
    padding: 1vh 2vw;
    text-align: right !important;
  }
  .photo {
    margin: 1vh 0;
    img {
      max-width: 200px;
      width: 80%;
      height: auto;
    }
  }
  @media (max-width: 576px) {
    .level {
      position: relative;
      text-align: left !important;
      h3 {
        display: inline;
      }
    }
    .attributes{
      h3 {
        display:inline;
      }
      span {
        margin-right: 10px;
      }
    }
  }
</style>
