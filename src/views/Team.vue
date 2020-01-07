<template>
  <div id="Team" class="view container">
    <Modal v-if="modal == true"/>
    <div class="row">
      <div class="col-lg-7">
        <div class="plain prime">
          <h2>Effectif</h2>
          <Button :id="'Maj'" :text="'Mettre à jour'" />
        </div>
      </div>
      <div class="col-lg-5">

      </div>
    </div>
  </div>
</template>

<script>
  import Modal from '../components/Modal.vue'
  import Button from '../components/ui/Button.vue';

  export default {
    name: 'Team',
    components: {
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
        return this.$store.state.team.competition;
      }
    },
    mounted() {
      this.$store.dispatch('team/fetchTeam',this.$route.params.id)
    }
  }
</script>

<style lang="scss" scoped>

</style>
