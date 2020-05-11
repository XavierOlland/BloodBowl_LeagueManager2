<template>
  <div id="NewCompetition" class="plain prime">
    <h2>Ajout de competition</h2>
    <form>
      Compétition en jeu :<br/>
        <select v-model="newCompetition.cyanide_id">
          <option v-for="competition in ingameCompetitions" :key="competition.id" :value="competition.id">{{competition.name}}</option>
          <option disabled>&#8212;&#8212;&#8212;&#8212;</option>
          <option value="">Competition chapeau (sponsors)</option>
        </select>
        <br/>
        Nom sur le site :<br/>
         <input type="text" v-model="newCompetition.site_name"><br/>
        Type de competition :<br/>
         <select v-model="newCompetition.site_order" >
          <option value="0">Competition principale</option>
          <option value="1">Tournoi annexe</option>
        </select><br/>
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
        </select><br/>
        Champion :<br/>
         <select v-model="newCompetition.champion">
          <option value="0">Non</option>
          <option value="1">Oui</option>
        </select><br/>
        <span v-if="newCompetition.cyanide_id && 1==0">
          Competition chapeau :<br/>
           <select v-model="newCompetition.competition_id_parent">
            <option v-for="competition in competitions" :key="competition.id" :value="competition.id">{{competition.site_name}}</option>
          </select><br/>
          <span v-if="newCompetition.competition_id_parent.length>0">
            Sponsor 1 : <select v-model="newCompetition.sponsor_id_1">
              <option v-for="sponsor in sponsors" :key="sponsor.id" :value="sponsor.id">{{sponsor.name}}</option>
            </select><br/>
            Sponsor 2 : <select v-model="newCompetition.sponsor_id_2">
              <option v-for="sponsor in sponsors" :key="sponsor.id" :value="sponsor.id">{{sponsor.name}}</option>
            </select><br/>
            Round : <input type="number" min="1" v-model="newCompetition.round" />
          </span>
        </span>
    </form>
    <p v-if="message.type" :class="message.type">{{message.text}}</p>
    <Button :id="'AddCompetition'" :text="'Ajouter'" @clicked="addCompetition" />
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
          cyanide_id: 0,
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
          round: 0
        }
      }
    },
    computed: {
      ingameCompetitions() {
        return this.$store.state.admin.ingameCompetitions;
      }
    },
    methods: {
      addCompetition() {
        const metadata = this.ingameCompetitions.find(param => param.id == this.newCompetition.cyanide_id)
        this.newCompetition.game_name = metadata.name;
        this.newCompetition.format = metadata.format;
        this.$store.dispatch('admin/addCompetition', this.newCompetition ).then((response) => {
           this.message = response;
        });
      }
    },

  }
</script>

<style lang="scss" scoped>
 .test {}
</style>
