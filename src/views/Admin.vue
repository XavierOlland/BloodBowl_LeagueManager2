<template>
  <div id="Admin" class="view container">
    <div class="row">
      <Archiver class="col-4"/>
      <NewCompetition class= "col-4"/>
      <Forum class= "col-4"/>
    </div>
  </div>
</template>

<script>
  import Archiver from '../components/admin/Archiver.vue'
  import NewCompetition from '../components/admin/NewCompetition.vue'
  import Forum from '../components/admin/Forum.vue'
  export default {
    name: 'Admin',
    components: {
      Archiver,
      NewCompetition,
      Forum
    },
    data(){
      return {
        admin: window.admin
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {

    },
    mounted(){
      this.$store.dispatch('admin/getIngameCompetitions');
      this.$store.dispatch('admin/getCompetitionsForums',[process.env.VUE_APP_COMPETITION_FORUM_ID]);
    }
  }
</script>

<style lang="scss">
  .success {
    color: #082 !important;
  }
  .warning {
    color: #F90 !important;
  }
  .failure {
    color: #B00 !important;
  }
</style>
