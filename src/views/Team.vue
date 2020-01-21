<template>
  <div id="Team" class="view container" v-if="!isFetching">
    <Modal v-if="modal == true"/>
    <div class="row">
      <div class="col-lg-7">
        <div class="plain prime" :style="{'border-color': team.color_1}">
          <h2>Effectif</h2>
          <Roster :roster="team.players" :colours="[team.color_1,team.color_2]" :formerPlayers="formerPlayers" :showStats="stats" />
          <Button :id="'Stats'" :text="'Statistiques'" :color="team.color_1" @clicked="toggleStats"/>
          <Button :id="'FormerPlayers'" :level="'secondary'" :text="formerPlayersText" :color="team.color_1" @clicked="toggleFormerPlayers"/>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="plain photo" v-if="team.id>268" :style="{'border-color': team.color_2}">
          <img class="cover" src="../assets/elements/Cover_Glass.png">
          <img :src="require('../assets/teams/photo'+team.id+'.jpg')" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Roster from '../components/Roster.vue'
  import Modal from '../components/Modal.vue'
  import Button from '../components/ui/Button.vue';

  export default {
    name: 'Team',
    components: {
      Roster,
      Modal,
      Button
    },
    data(){
      return {
        modal: false,
        stats: false,
        formerPlayers: false,
        formerPlayersText: '+ Anciens'
      }
    },
    computed:{
      team(){
        return this.$store.state.team.team;
      }
    },
    methods: {
      toggleStats: function() {
        this.stats = !this.stats;
      },
      toggleFormerPlayers: function() {
        this.formerPlayers = !this.formerPlayers;
        if(this.formerPlayers == true){
          this.formerPlayersText = '- Anciens';
        }
        else {
          this.formerPlayersText = '+ Anciens';
        }
      }
    },
    mounted() {
      this.$store.dispatch('team/fetchTeam',this.$route.params.id)
    },
    watch: {
      team: function() {
        this.isFetching = this.team.length>0? true : false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .photo {
    padding:0;
    img {
      width: 100%;
      height: 100%;
    }
    .cover{
      position: absolute;
      z-index: 2;
    }
  }
</style>
