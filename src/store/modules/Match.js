import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});
const route = 'vue-routes.php?action=';
const state = {
  metadata: {},
  match: {},
}

const mutations = {
  setMetadata(state, payload) {
    state.metadata = payload;
  },
  setMatch(state, payload) {
    state.match = payload;
  }
}

const actions = {
  fetchMatch(context, id) {
    instance.post(route + 'match', [id])
      .then(response => {
        var match = JSON.parse(response.data.json).match;
        console.error(match); // eslint-disable-line no-console
        context.commit('setMatch', match);
        delete response.data.json;
        context.commit('setMetadata', response.data)
      }, error => {
        console.error(error); // eslint-disable-line no-console
      });
  },
  updateMatch(context, match) {
    instance.post(route + 'matchDate', match)
      .then(() => {
        context.commit('setMatch', match);
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
