<template>
  <div id="Archiver">
    <div class="plain prime">
      <h2>Passage de saison</h2>
      <p>En passant la saison, les compétitions sont archivées. Les équipes et coachs sont rendues "inactifs". Leur participation à une nouvelle compétition les réactivera.</p>
      <p v-if="season.length>0" class="data">Saison en cours: <br/>
        <span>{{season[0].season}}</span><br/><br/>
      Competitions:<br/>
      <ul>
        <li v-for="competition in season" :key="competition.competition_ID">{{competition.site_name}} <span v-if="competition.matchsLeft>0">(encore {{competition.matchsLeft}} matchs à jouer)</span></li>
      </ul>
      </p>
      <p v-else :class="message.type">{{message.text}}</p>
      <Button :id="'ArchiveSeason'" :text="'Archiver'" @clicked="archiveSeason" />
    </div>
  </div>
</template>

<script>
  import Button from '../ui/Button.vue';

  export default {
    name: 'Archiver',
    components: {
      Button
    },
    data() {
      return {
        step: 1,
        message: {
          type: 'warning',
          text: 'Aucune competition en cours'
        }
      }
    },
    computed: {
      season() {
        return this.$store.state.competitions;
      }
    },
    methods: {
       archiveSeason() {
         this.$emit('loader', 'Archivage en cours');
        this.$store.dispatch('admin/archiveSeason').then((response) => {
          this.message = response;
          this.$emit('loader', '');
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .data {
    span, ul {
      font-weight: bold;
      color: $prime-color
    }
    ul {
      padding-left: 2rem;
    }
  }
</style>
