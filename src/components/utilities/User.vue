<template>
  <div id="User" class="plain prime">
    <p>Utilisateur: {{user.username}}<br/>
    Groupe: {{user.group_id}}<br/>
    ID Coach: {{user.coach}}</p>
  </div>
</template>

<script>

  export default {
    name: 'User',
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>

<style lang="scss" scoped>
  #User {
    padding-bottom: 10px;
  }
</style>
