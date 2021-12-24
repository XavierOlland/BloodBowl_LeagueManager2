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
  lastGames: [],
  history: []
}

const mutations = {
  setTeam(state, payload) {
    state.team = payload;
  },
  setLastGames(state, payload) {
    state.lastGames = payload;
  },
  setHistory(state, payload) {
    state.history = payload;
  },
  setTeamColours(state, payload) {
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
        context.dispatch('fetchTeamLastGames',[team.id,5]);
        context.dispatch('fetchTeamHistory',team.id);
      }, error => {
        console.error(error); // eslint-disable-line no-console
      });
  },
  fetchTeamLastGames(context, params) {
    instance.post(route + 'teamLastGames', params).then(response => {
      var games = response.data;
      context.commit('setLastGames', games);
    }, error => {
      console.error(error); // eslint-disable-line no-console
    });
  },
  fetchTeamHistory(context, team_id) {
    instance.post(route + 'teamHistory', [team_id]).then(response => {
      var history = response.data;
      context.commit('setHistory', history);
    }, error => {
      console.error(error); // eslint-disable-line no-console
    });
  },
  updateTeamColours(context, params) {
    instance.post(route + 'teamColoursUpdate', params);
    context.commit('setTeamColours', params[1]);
  },
  uploadTeamPhoto(context, data) {
    return instance.post(route + 'teamPhotoUpdate', data);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
