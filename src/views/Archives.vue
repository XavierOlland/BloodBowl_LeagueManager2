<template>
  <div id="Archives" class="view container" >
    <div class="row">
      <div class="col-lg-3 hidden-md-down scroll">
        <div class="plain seconde searchBox">
          asd
        </div>
      </div>
      <div class="col-lg-9 scroll">
        <div class="col-sm-6 col-xl-4" v-for="archive in archives" :key="archive.id">
          <Champion v-if="archive.champion==1 && archive.standing[0]"
            :mode="'list'"
            :competition="{id:archive.id,name:archive.season}"
            :coach="archive.standing[0].coach"
            :team="archive.standing[0].name"
            :race="Number(archive.standing[0].race)"
            :logo="archive.standing[0].logo"
            :colours="[archive.standing[0].color_1,archive.standing[0].color_2]"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  import Champion from '../components/Champion.vue'


  export default {
    name: 'Archives',
    components: {
      Champion
    },
    props: {
      dictionnary: Array
    },
    data(){
      return {
        isFetching: true,
      }
    },
    computed:{
      archives(){
        return this.$store.state.archives.archives;
      }
    },
    methods: {

    },
    mounted() {
      this.$store.dispatch('archives/fetchArchives')
    },
    watch: {
      archives: function() {
        this.isFetching = this.archives.length>0? true : false;
      }
    }

  }
</script>

<style lang="scss" scoped>
  .something {}

</style>
