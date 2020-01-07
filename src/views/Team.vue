<template>
  <div id="Team" class="view container">
    <Modal v-if="modal == true"/>
    <div class="row">
      <div class="col-lg-7">
        <div class="plain prime">
          <h2>Effectif</h2>
          <Roster :roster="team.players" :colours="[team.color_1,team.color_2]" :showStats="false" />
          <Button :id="'Maj'" :text="'Statistiques'" />
        </div>
      </div>
      <div class="col-lg-5">
asd
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
    props: {
      dictionnary: Array
    },
    data(){
      return {
      }
    },
    computed:{
      team(){
        return this.$store.state.team.team;
      }
    },
    mounted() {
      this.$store.dispatch('team/fetchTeam',this.$route.params.id)
    }
  }
</script>

<style lang="scss" scoped>

</style>
