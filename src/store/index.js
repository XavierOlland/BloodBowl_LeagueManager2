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
    dictionnary: []
  },
  getters: {
    getTranslation: (state) => (name) => {
      return state.dictionnary.find(param => param.name == name ).translation;
    }
  },
  mutations: {
    setDictionnary(state,payload) {
      state.dictionnary = payload;
    },
    setCompetitions(state,payload) {
      state.competitions = payload;
    }
  },
  actions: {
    boot(context){
      axios.get("http://bbbl.fr/backend/vue-routes.php?action=boot")
        .then(response => {
          context.commit('setDictionnary', response.data.parameters);
          context.commit('setCompetitions', response.data.competitions);
        }, error => {
          console.error(error);
        });
    }

  }
})
