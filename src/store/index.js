import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const data = axios.get("http://bbbl.fr/backend/vue-routes.php?action=boot")
  .then(response => {
    return response.data;
  }, error => {
    console.error(error);
    return []
  });

export default new Vuex.Store({
  state: {
    dictionnary: [],
    competitions: [],
    statistics: [],
    calendar: {}
  },
  getters: {
    getTranslation: (state) => (name) => {
      return state.dictionnary.find(param => param.name == name ).translation;
    },
    upcomingGames: (state) => {
      return state.calendar;
    }
  },
  mutations: {
    setDictionnary(state,payload) {
      state.dictionnary = payload;
    },
    setCompetitions(state,payload) {
      state.competitions = payload;
    },
    setStatistics(state,payload) {
      state.statistics = payload;
    },
    setCalendar(state,payload) {
      state.calendar = payload;
    }
  },
  actions: {
    boot(context){
      axios.get(process.env.VUE_APP_BACKENDURL + "action=boot")
        .then(response => {
          context.commit('setDictionnary', response.data.parameters);
          context.commit('setCompetitions', response.data.competitions);
          context.commit('setStatistics', response.data.stats);
        }, error => {
          console.error(error);
        });
    },
    upcomingGames(context){
      axios.get(process.env.VUE_APP_BACKENDURL + "action=upcomingGames")
        .then(response => {
          const calendar = response.data? repsonse.data : {};
          context.commit('setCalendar', calendar);
        }, error => {
          console.error(error);
        });
    },

  }
})
