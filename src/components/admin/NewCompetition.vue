<template>
  <div id="NewCompetition">
    <div class="plain prime">
    <h2>Ajout de competition</h2>
    <p>Les forums pour les journées doivent être créés avant l'ajout de la compétition.</p>
    <div>
      <form>
        Nom :<br/>
         <input type="text" v-model="newCompetition.site_name">
         <br/>
        Type de competition :<br/>
         <select v-model="newCompetition.site_order" >
          <option value="0">Competition principale</option>
          <option value="1">Tournoi annexe</option>
        </select>
        <br/>
        Saison :<br/>
          <select v-model="newCompetition.season" >
            <option value="Hiver">Hiver</option>
            <option value="Printemps">Printemps</option>
            <option value="Été">Été</option>
            <option value="Automne">Automne</option>
          </select>
          <br/>
        Partie de saison :<br/>
          <select v-model="newCompetition.competition_mode">
            <option value="Saison">Saison complète</option>
            <option value="Qualification">Qualifications</option>
            <option value="Coupe">Coupe</option>
            <option value="Partie 1">Partie 1</option>
            <option value="Partie 2">Partie 2</option>
          </select>
          <br/>
        Champion :<br/>
          <select v-model="newCompetition.champion">
            <option value="0">Non</option>
            <option value="1">Oui</option>
          </select>
          <br/>
        Format :<br/>
          <select v-model="newCompetition.format">
            <option value="round_robin">Round robin</option>
            <option value="single_elimination">Elimination directe</option>
            <option value="Ladder">Ladder</option>
            <option value="swiss">Ronde suisse</option>
          </select>
          <br/>
        Nombre de journées :<br/>
         <input type="number" v-model="newCompetition.rounds_count"><br/>
        Forum de première journée :<br/>
          <select v-model="newCompetition.forum_id">
            <option disabled value="">Sélectionner</option>
            <optgroup v-for="parent in forums" :key="parent.forum_id" :label="parent.forum_name">
              <option v-for="sub in parent.subs" :key="sub.forum_id" :value="sub.forum_id">{{sub.forum_name}}</option>
            </optgroup>
          </select>
      </form>
    </div>

    <p v-if="message.type" :class="message.type">{{message.text}}</p>

    <Button :id="'AddCompetition'" :text="'Ajouter'" @clicked="addCompetition" />

  </div>
  </div>
</template>

<script>
  import Button from '../ui/Button.vue';

  export default {
    name: 'NewCompetition',
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
        newCompetition: {
          cyanide_id: 'null',
          site_order: 0,
          league_name: 'Compétition principale',
          game_name: '',
          site_name: '',
          season: 'Hiver',
          competition_mode: 'Saison',
          format: 'round_robin',
          champion: 0,
          competition_id_parent: 'null',
          sponsor_id_1: 'null',
          sponsor_id_2: 'null',
          rounds_count: 0,
          forum_id: ''
        }
      }
    },
    computed: {
      ingameCompetitions() {
        return this.$store.state.admin.ingameCompetitions;
      },
      forums() {
        return this.$store.state.admin.forums;
      }
    },
    methods: {
      addCompetition() {
        this.$emit('loader', 'Création de la compétition');
        this.newCompetition.game_name = this.newCompetition.site_name;
        this.$store.dispatch('admin/addCompetition', this.newCompetition ).then((response) => {
           this.message = response;
           this.$emit('loader', '');
        });
      }
    },

  }
</script>

<style lang="scss" scoped>
  #NewCompetition {
    select, input {
      margin:0.25rem 0 0.5rem;
    }
  }
</style>
