<template>
  <div id="Match" class="view container">
    <div class="col-md-3"></div>
    <div class="col-md-6" @click="previousPage()">
      <div class="plain header seconde text-center stadium zelda">
        <h4>{{match.leaguename}}</h4>
        <h3>{{match.competitionname}}</h3>
      </div>
    </div>
    <div class="col-md-1"></div>
    <div class="col-md-1 topright" :class="{tab : admin==1}">
      <div class="label" @click="matchReset()" v-if="admin==1">Reset</div>
    </div>
    <div class="col-md-1 topright" :class="{tab : coach_id==match.coach_id_1 || coach_id==match.coach_id_2 || admin==1}">
      <a href="" v-if="coach_id==match.coach_id_1 || coach_id==match.coach_id_2 || admin==1">
        <div class="label">Poster</div>
      </a>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Match',
    components: {
    },
    props: {
    },
    data(){
      return {
        admin: 0,
        coach_id: 1
      }
    },
    computed:{
      match(){
        return this.$store.state.match.match;
      },
      metadata(){
        return this.$store.state.match.metadata;
      },
    },
    mounted() {
      this.$store.dispatch('match/fetchMatch',this.$route.params.id)
    },
  }
</script>

<style lang="scss" scoped>
 .poukram {
   z-index: 1;
 }
</style>
