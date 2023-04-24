<template>
  <div id="Admin" class="view container">
    <Loader v-if="loaderText" :text="loaderText"/>
    <div class="row no-gutters">
      <Archiver class="col-3" v-on:loader="loading"/>
      <NewCompetition class= "col-6" v-on:loader="loading"/>
      <Forum class= "col-3" v-on:loader="loading"/>
    </div>
    <div class="row no-gutters">
      <NewMatchs class= "col-7" v-on:loader="loading"/>
      <div class="col-5">
      <NewTeam v-on:loader="loading"/>
      <User/></div>
    </div>
  </div>
</template>

<script>
  import Archiver from '../components/admin/Archiver.vue'
  import NewCompetition from '../components/admin/NewCompetition.vue'
  import NewMatchs from '../components/admin/NewMatchs.vue'
  import NewTeam from '../components/admin/NewTeam.vue'
  import Forum from '../components/admin/Forum.vue'
  import Loader from '../components/ui/Loader.vue';
  import User from '../components/utilities/User.vue'

  export default {
    name: 'Admin',
    components: {
      Archiver,
      NewCompetition,
      NewMatchs,
      NewTeam,
    User,
      Forum,
      Loader
    },
    data() {
      return {
        loaderText: '',
        admin: window.admin
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      loading(value) {
        this.loaderText = value;
      }
    },
    mounted() {
      this.$store.dispatch('admin/getCompetitionsForums',[process.env.VUE_APP_COMPETITION_FORUM_ID]);
    }
  }
</script>

<style lang="scss">
  p, form {
    margin-top: 10px;
  }
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
