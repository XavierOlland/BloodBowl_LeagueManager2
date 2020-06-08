<template>
  <div id="Archives" class="view container">
    <div class="row">
      <div class="col-3 scroll">
        <div class="plain seconde searchBox scroll">
          <h2>Archives publiques</h2>
          <div class="searchFilter">
            <input class="search" type="text" v-model="searchQuery" placeholder="Cherchez une équipe, un coach, etc" />
            <div class="searchAction" v-if="searchQuery" @click="clearSearch"/>
          </div>
          <CompetitionsList :data="searchList" class="searchResults"/>
        </div>
      </div>
      <div class="col-9 scroll d-flex flex-wrap align-content-start">
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
  import CompetitionsList from '../components/CompetitionsList.vue'

  export default {
    name: 'Archives',
    components: {
      Champion,
      CompetitionsList
    },
    props: {
      dictionnary: Array
    },
    data(){
      return {
        isFetching: true,
        searchQuery: ''
      }
    },
    computed:{
      archives(){
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
      champions(){
        var champions = this.$store.state.archives.archives.filter(archive => archive.champion == 1);
        return champions
      }
    },
    methods: {
      clearSearch: function(){
        this.searchQuery = ''
      }
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
  h2 {
    color: $seconde-color;
  }
  .searchBox {
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
