<template>
  <div id="Archives" class="view container" >
    <div class="row">
      <div class="col-3 hidden-md-down scroll">
        <div class="plain seconde searchBox">
          asd
        </div>
      </div>
      <div class="col-9 scroll d-flex flex-wrap">
          <div class="col-4" v-for="archive in champions" :key="archive.id">
            <Champion
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
      },
      champions(){
        var champions = this.$store.state.archives.archives.filter(archive => archive.champion == 1);
        console.log(champions) // eslint-disable-line no-console
        return champions
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
  .my-flex {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
  }
  .test {
    flex:auto;
  }
</style>
