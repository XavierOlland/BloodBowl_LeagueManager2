import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import axios from 'axios'
import admin from './modules/Admin.js'
import archives from './modules/Archives.js'
import competition from './modules/Competition.js'
import match from './modules/Match.js'
import team from './modules/Team.js'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});

const route = process.env.VUE_APP_BACKEND_ROUTES;

export default new Vuex.Store({
  modules: {
    admin,
    archives,
    competition,
    match,
    team
  },
  state: {
    user: {},
    dictionnary: [],
    competitions: [],
    statistics: [],
    upcomingGames: [],
    lastGames: []
  },
  getters: {
    getTranslation: (state) => (name) => {
      var item = state.dictionnary.find(param => param.name == name);
      var translation = !item ? "Nie novem popolsku" : item.translation;
      return translation
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      if(payload.coach == null){
        state.user.coach = {
          "id": "0",
          "cyanide_id": "0",
          "active": "0",
          "gold": "0"
        }
      }
    },
    setDictionnary(state, payload) {
      state.dictionnary = payload;
    },
    setCompetitions(state, payload) {
      state.competitions = payload;
    },
    setStatistics(state, payload) {
      state.statistics = payload;
    },
    setUpcomingGames(state, payload) {
      state.upcomingGames = payload;
    },
    setLastGames(state, payload) {
      state.lastGames = payload;
    }
  },
  actions: {
    async boot(context) {
      instance.get(route + 'boot')
        .then(response => {
          context.commit('setDictionnary', response.data.parameters);
          context.commit('setCompetitions', response.data.competitions);
          context.commit('setStatistics', response.data.stats);
          context.commit('setUser', window.user);
          context.dispatch('upcomingGames');
          context.dispatch('lastGames');
        }, error => {
          console.error(error);
        });
    },
    async upcomingGames(context) {
      instance.get(route + 'upcomingGames')
        .then(response => {
          const calendar = response.data ? response.data : [];
          context.commit('setUpcomingGames', calendar);
          if(calendar.length == 0){
            context.dispatch('lastGames')
          }
        }, error => {
          console.error(error); // eslint-disable-line no-console
        });
    },
    async lastGames(context) {
      instance.get(route + 'lastGames')
        .then(response => {
          const calendar = response.data ? response.data : {};
          context.commit('setLastGames', calendar);
        }, error => {
          console.error(error); // eslint-disable-line no-console
        });
    }
  },
  plugins: [vuexLocal.plugin]
})
