<template>
  <div id="Landing" class="view container">
    <Modal v-if="modal == true"/>
    <div class="row">
      <div id="LeftColumn" class="col-lg-3 d-none d-sm-block">
        <div class="image">
          <img src="../assets/league/Logo_M.png">
        </div>

        <div v-if="user.group_id==1" class="plain seconde">
          {{user}}
          <h3>La BBBL c'est</h3>
          <ul class="hallOfFame list-unstyled">
            <li><h3>{{leagueStats.coachs}}</h3> coachs actifs,</li>
            <li><h3>{{leagueStats.matches}}</h3> matchs,</li>
            <li><h3>{{leagueStats.TD}}</h3> touchdowns,</li>
            <li><h3>{{leagueStats.casualties}}</h3> sorties</li>
            <li>et <h3>{{leagueStats.death}}</h3> morts...</li>
          </ul>
          <p>La BBBL c'est du sang, de la violence, des indiens... Chaque jour que les dieux font, nous nous echarpons joyeusement sur les terrains.</p>
          <p>Mais toi le visiteur, toi le coach, toi le paria, toi aussi tu peux venir cramponner dans nos rangs.</p>
          <p>Il te suffit de t'inscrire sur notre forum et de remplir le formulaire 22X47B, ainsi que l'appendice 42 et verser les 51 pièces d'or nécessaires au gobelin comptable de permanence.</p>
          <Button v-if="admin==1" :id="'Seconde'" :text="'Administrer'" @clicked="$router.push('Admin')"/>
          <Button v-else :id="'Seconde'" :text="'Découvrir'" @click="goToForum()"/>
        </div>

        <UpcomingGames v-if="upcomingGames.length>0" :games="upcomingGames" :level="'seconde'"/>

        <div class="plain seconde">
          <h3>Légendaires</h3>
          <p>Woody Roots Bush Bombers, Darkside Magic, Rats Fils Tauleurs... Ces équipes comme beaucoup d'autres ont marqué de leur empreinte la BBBL.<br/>
          Tribunes vous offres aujourd'hui un accés illimité à l'Histoire de la ligue</p>
          <Button :id="'Seconde'" :text="'les Archives'" @clicked="$router.push('Archives')"/>
        </div>
        <User/>
      </div>

      <div id="MidColumn" class="col-xl-6 col-lg-9">
        <!--div class="col-sm quote">
            <h1>"J'ai aimé cette ligue comme je n'ai jamais aimé aucune femme..."</h1>
            <p>Coach Jahstrad, peu avant sa disparition</p>
        </div-->
        <LastGames v-if="lastGames.length>0" :games="lastGames" :limit="4" :level="'prime'"/>
        <!-- Competitions -->
        <div class="plain prime zelda" title="Voir la compétition" v-for="competition in competitions" :key="competition.id" @click="$router.push({ name: 'Competition', params: { id: competition.id }})">
          <h2 v-if="competition.site_name==competition.season">{{competition.site_name}} </h2>
          <h2 v-else>{{competition.season}} - {{competition.site_name}} </h2>
          <CompetitionStanding v-if="competition.format!='single_elimination'" :competition="competition" :limit="5" :teamAccess="false"/>
          <StandingSingleElimination v-else :competition="competition" :roundsName="[]" :teamAccess="false"/>
          <Button :id="'Prime'" :text="'La Compétition'" @clicked="$router.push({ name: 'Competition', params: { id: competition.id }})" />
        </div>
      </div>

      <div id="RightColumn" class="col-xl-3 stick-right d-none d-xl-block" >
        <Champion
        :mode="'card'"
        :competition="champion.competition"
        :coach="champion.coach"
        :team="champion.team"
        :race="Number(champion.race)"
        :logo="champion.logo"
        :colours="champion.colours"
        />
        <Statistics v-for="stat in leagueStats.playersStats" :key="stat.type" :statistics="stat" :limit="3" />
      </div>

    </div>
  </div>
</template>

<script>
import UpcomingGames from '../components/UpcomingGames.vue'
import LastGames from '../components/LastGames.vue'
import StandingSingleElimination from '../components/StandingSingleElimination.vue'
import CompetitionStanding from '../components/CompetitionStanding.vue'
import Champion from '../components/Champion.vue'
import Statistics from '../components/Statistics.vue'
import Modal from '../components/Modal.vue'
import Button from '../components/ui/Button.vue';
import User from '../components/utilities/User.vue';

export default {
  name: 'Home',
  components: {
    LastGames,
    UpcomingGames,
    CompetitionStanding,
    StandingSingleElimination,
    Champion,
    Statistics,
    Modal,
    Button,
    User
  },
  props: {
    msg: String
  },
  data(){
    return {
      admin: window.admin,
      modal: false
    }
  },
  computed: {
    competitions() {
      return this.$store.state.competitions;
    },
    leagueStats() {
      return this.$store.state.statistics;
    },
    upcomingGames() {
      return this.$store.state.upcomingGames;
    },
    lastGames() {
      return this.$store.state.lastGames;
    },
    user() {
      return this.$store.state.user
    },
    champion() {
      return JSON.parse(this.$store.getters.getTranslation('Current champion'));
    }
  },
  methods: {
    goToPage(page) {
      this.$router.push(page);
    },
    goToForum() {
      window.location.href = 'Forum'
    }
  }
}
</script>

<style lang="scss" scoped>
  .row > div {
    padding:0;
  }
  .image {
    position:relative;
    margin:20px 0px;
    text-align: center;
    img {
      width:100%;
      height:auto;
      margin: 0;
    }
  }
  .quote {
    padding: 20px;
    h1 {
      font-size: 4em;
      line-height: 1em;
      font-family: 'Niconne', cursive;
      color: $prime-text;
      text-shadow: 0 0.04em 0.07em $shadow;
    }
    p, p a {
      font-size: 2em;
      line-height: 1em;
      font-family: 'Niconne', cursive;
      text-align: right;
      display:inherit;
      color:$seconde-text;
      text-shadow: 0 0.04em 0.04em $shadow;
    }
    p a {
    text-decoration: underline;
    }
  }
  ul.hallOfFame {
    font-family:'Muli';
    font-weight: 700;
    font-size: 1em;
    line-height: 1.2;
    margin:0 0 10px;
    color: $prime-text;
    text-indent: 10px;
    text-transform: uppercase;
  }
  @media (max-width: 576px) {
    .quote {
      h1 {
        font-size: 2.75em
      }
    }
  }
</style>
