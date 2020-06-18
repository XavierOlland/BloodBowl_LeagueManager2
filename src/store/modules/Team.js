import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});
const route = 'vue-routes.php?action=';
const state = {
  team: {},
}

const mutations = {
  setTeam(state, payload) {
    state.team = payload;
  }
}

const actions = {
  fetchTeam(context, id) {
    instance.post(route + 'team', [id])
      .then(response => {
        var team = response.data;
        context.commit('setTeam', team);
      }, error => {
        console.error(error); // eslint-disable-line no-console
      });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
