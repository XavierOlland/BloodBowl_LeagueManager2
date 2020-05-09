<template>
  <div id="Admin" class="view container">
    <div class="row">
      <Archiver class="col-4"/>
    </div>
  </div>
</template>

<script>
  import Archiver from '../components/admin/Archiver.vue'
  export default {
    name: 'Admin',
    components: {
      Archiver,
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
