<template>
  <div id="Archives" class="view container-fluid">
    <Loader v-if="isFetching==true" :text="loaderText"/>
    <div class="row no-gutters">
      <div class="d-none d-md-block col-md-4 col-xl-3 scroll">
        <div class="plain seconde searchBox scroll">
          <h2>Archives publiques</h2>
          <div class="searchFilter">
            <input class="search" type="text" v-model="searchQuery" placeholder="Cherchez une équipe, un coach, etc" />
            <div class="searchAction" v-if="searchQuery" @click="clearSearch"/>
          </div>
          <CompetitionsList :data="searchList" class="searchResults"/>
        </div>
      </div>
      <div class="col-12 col-md-8 col-xl-9 no-gutters scroll d-flex flex-wrap align-content-start">
          <div class="col-sm-6 col-xl-4" v-for="archive in champions" :key="archive.id">
            <Champion
              :mode="'list'"
              :competition="{id:archive.id,name:archive.season}"
              :coach="archive.standing[0].coach_name"
              :team="{id:archive.standing[0].team_cyanide_id, name:archive.standing[0].team_name}"
              :race="Number(archive.standing[0].team_race)"
              :logo="archive.standing[0].team_logo"
              :colours="JSON.parse(archive.standing[0].team_colors)"
            />
          </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Champion from '../components/Champion.vue'
  import CompetitionsList from '../components/CompetitionsList.vue'
  import Loader from '../components/ui/Loader.vue'

  export default {
    name: 'Archives',
    components: {
      Champion,
      CompetitionsList,
      Loader
    },
    props: {
      dictionnary: Array
    },
    data() {
      return {
        isFetching: this.$store.state.archives.archives.length>0? false : true,
        searchQuery: '',
        loaderText: 'Récupération des données'
      }
    },
    computed: {
      archives() {
        return this.$store.state.archives.archives;
      },
      searchList() {
        if(this.searchQuery){
          var query = this.searchQuery.toLowerCase();
          return this.$store.state.archives.archives.filter( archive =>{
            return  JSON.stringify(archive.standing).toLowerCase().includes(query)
          })
        }
        else {
          return this.$store.state.archives.archives
        }
      },
      champions() {
        var champions = this.$store.state.archives.archives.filter(archive => archive.champion == 1);
        return champions
      }
    },
    methods: {
      clearSearch() {
        this.searchQuery = ''
      }
    },
    mounted() {
      this.$store.dispatch('archives/fetchArchives')
    },
    watch: {
      archives: function() {
        this.isFetching = this.archives.length>0? false : true;
      }
    }

  }
</script>

<style lang="scss" scoped>
  h2 {
    color: $seconde-color;
  }
  .searchBox {
    margin-top: 3rem;
    padding-bottom: 30px;
  }
  .searchFilter {
    position: relative;
    margin: 1em 0;
    input {
      border:none;
      width: 100%;
      height: 2em;
      padding: 0.15em;
      border-radius: 3px;
      background-color: #ffffff;
      color: #000;
    }
    .searchAction {
      position: absolute;
      right: 1%;
      top: 10%;
      height: 80%;
      width: 8%;
      z-index: 2;
      background-color: #ccc;
    }
  }
  .searchResults {
    overflow-y: auto;
    overflow-x: hidden;
    border-top: solid 1px #373737;
    border-bottom: solid 1px #373737;
    padding-right:  20px;
    height: calc(100vh - 243px);
  }

</style>
