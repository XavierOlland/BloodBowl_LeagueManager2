import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});
const route = process.env.VUE_APP_BACKEND_ROUTES;
const state = {
  team: {},
}

const mutations = {
  setTeam(state, payload) {
    state.team = payload;
  },
  teamColours(state, payload) {
    state.team.color_1 = payload[0];
    state.team.color_2 = payload[1];
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
  },
  updateTeamColours(context, params) {
    instance.post(route + 'teamColoursUpdate', params);
    context.commit('teamColours', params[1]);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
