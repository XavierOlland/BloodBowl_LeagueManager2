<template>
  <div id="NewMatchs">
    <div class="plain prime">
      <h2>Ajout de matchs</h2>
      <div>
        <form class="row gutters">
          Competition :
          <select v-model="competition">
            <option v-for="competition in competitions" :key="competition.id" :value="competition.id" >{{ competition.site_name }}</option>
          </select><br/>
          Round :
          <input type="number" v-model="round">
          <br/>
          
          <div class="row" v-for="(match,index) in newMatchs" :key="index" >
              <div class="col-2">
                <h4>Match {{index+1}}</h4>
              </div>
              <div class="col-5">
                Equipe 1 :<br/>
                <select v-model="match.team_1">
                  <option disabled value="">Sélectionner</option>
                  <option v-for="team in activeTeams" :key="team.id" :value="team.id">{{team.name}}</option>
                </select>
              </div>
              <div class="col-5">
                Equipe 2 :<br/>
                <select v-model="match.team_2">
                  <option disabled value="">Sélectionner</option>
                    <option v-for="team in activeTeams" :key="team.id" :value="team.id">{{team.name}}</option>
                </select>
              </div>
          </div><br/> 
        </form>
      </div>

      <p v-if="message.type" :class="message.type">{{message.text}}</p>

      <Button :id="'AddMatchs'" :text="'Ajouter'" @clicked="addMatchs" />

    </div>
  </div>
</template>

<script>
  import Button from '../ui/Button.vue';

  export default {
    name: 'NewMatchs',
    components: {
      Button
    },
    data() {
      return {
        step: 2,
        message: {
          type: '',
          text: ''
        },
        competition: null,
        round: 1,
        newMatchs: [{team_1:'',team_2:''}]
      }
    },
    computed: {
      activeTeams() {
        return this.lodash.sortBy(this.$store.state.admin.activeTeams,['name']);
      },
      competitions() {
        return this.$store.state.competitions;
      }
    },
    methods: {
      addMatchs() {
        this.$emit('loader', 'Création des matchs');
        this.$store.dispatch('admin/addMatchs', [this.competition, this.round, this.newMatchs] ).then((response) => {
           this.message = response;
           this.$emit('loader', '');
        });
      }
    },
    mounted() {
      this.$store.dispatch('admin/getActiveTeams');
    },
    watch: {
      activeTeams: function() {
        var matchs = [];
        for (let i = 0; i < this.activeTeams.length/2; i++) {
          matchs.push({team_1:'',team_2:''});
        }
        this.newMatchs = matchs;
      }
    }

  }
</script>

<style lang="scss" scoped>
  #NewMatchs {
    select, input {
      margin:0.25rem 0 0.5rem;
    }
  }
</style>
