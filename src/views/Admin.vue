<template>
  <div id="Admin" class="view container">
    <Loader v-if="loaderText" :text="loaderText"/>
    <div class="row">
      <Archiver class="col-4"/>
      <NewCompetition class= "col-4"/>
      <Forum class= "col-4" v-on:loader="loading"/>
    </div>
  </div>
</template>

<script>
  import Archiver from '../components/admin/Archiver.vue'
  import NewCompetition from '../components/admin/NewCompetition.vue'
  import Forum from '../components/admin/Forum.vue'
  import Loader from '../components/ui/Loader.vue';

  export default {
    name: 'Admin',
    components: {
      Archiver,
      NewCompetition,
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
      this.$store.dispatch('admin/getIngameCompetitions');
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
