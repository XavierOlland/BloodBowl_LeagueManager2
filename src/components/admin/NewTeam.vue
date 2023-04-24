<template>
  <div id="NewTeam">
    <div class="plain prime">
      <h2>Ajout d'équipe</h2>
      <div>
        <form class="row gutters">
          Coach :
          <select v-model="team.coach_id">
            <option v-for="coach in activeCoachs" :key="coach.id" :value="coach.id" >{{ coach.name }}</option>
          </select><br/>
          Race :
          <select v-model="team.param_id_race">
            <option v-for="race in races" :key="race.id" :value="race.name" >{{ race.translation }}</option>
          </select><br/>
          Nom :
          <input type="text" v-model="team.name">
          <br/>
        </form>
      </div>

      <p v-if="message.type" :class="message.type">{{message.text}}</p>

      <Button :id="'AddTeam'" :text="'Ajouter'" @clicked="addTeam" />

    </div>
  </div>
</template>

<script>
  import Button from '../ui/Button.vue';

  export default {
    name: 'NewTeam',
    components: {
      Button
    },
    data() {
      return {
        message: {
          type: '',
          text: ''
        },
        team: {
          coach_id: null,
          param_id_race: null,
          name: null
        }
      }
    },
    computed: {
      activeCoachs() {
        return  this.lodash.sortBy(this.$store.state.admin.activeCoachs, ['name']);
      },
      races() {
        return this.lodash.sortBy(this.$store.state.dictionnary.filter(param => param.type=='race'),['translation']);
      }
    },
    methods: {
      addTeam() {
        this.$emit('loader', 'Création de l\'équipe');
        this.$store.dispatch('admin/addTeam', this.team ).then((response) => {
           this.message = response;
           this.$emit('loader', '');
        });
      }
    },
    mounted() {
      this.$store.dispatch('admin/getActiveCoachs');
    }

  }
</script>

<style lang="scss" scoped>
  #NewTeam {
    select, input {
      margin:0.25rem 0 0.5rem;
    }
  }
</style>
