<template>
  <div id="Admin" class="view container">
    <div class="row">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Admin',
    components: {

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
