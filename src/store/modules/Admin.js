import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});
const route = 'admin.php?action=';
const state = {
  ingameCompetitions: [],
  forums: [],
  activeTeams: [],
  activeCoachs: []
}

const mutations = {
  setIngameCompetitions(state, payload) {
    state.ingameCompetitions = payload;
  },
  setCompetitionsForums(state, payload) {
    state.forums = payload;
  },
  setActiveTeams(state, payload) {
    state.activeTeams = payload;
  },
  setActiveCoachs(state, payload) {
    state.activeCoachs = payload;
  },
}

const actions = {
  async archiveSeason(context) {
    const response = await instance.post(route + 'seasonArchive');
    context.commit('setCompetitions', [], {
      root: true
    })
    context.dispatch('Archives/fetchArchives');
    return response.data
  },
  getIngameCompetitions(context) {
    instance.post(route + 'getIngameCompetitions')
      .then(response => {
        
        var ingameCompetitions = Object.keys(response.data).map(i => response.data[i]);
        context.commit('setIngameCompetitions', ingameCompetitions);
      }, error => {
        console.error(error); // eslint-disable-line no-console
      });
  },
  getCompetitionsForums(context, id) {
    instance.post(route + 'getCompetitionsForums', id)
      .then(response => {
        var competitionsForums = response.data;
        context.commit('setCompetitionsForums', competitionsForums);
      }, error => {
        console.error(error); // eslint-disable-line no-console
      });
  },
  getActiveTeams(context) {
    instance.post(route + 'getActiveTeams')
      .then(response => {
        context.commit('setActiveTeams', response.data);
      }, error => {
        console.error(error); // eslint-disable-line no-console
      });
  },
  getActiveCoachs(context) {
    instance.post(route + 'getActiveCoachs')
      .then(response => {
        context.commit('setActiveCoachs', response.data);
      }, error => {
        console.error(error); // eslint-disable-line no-console
      });
  },
  async addCompetition(context, params) {
    const response = await instance.post(route + 'competitionAdd', params)
    context.commit('setIngameCompetitions', response.data.competitions);
    return response.data
  },
  async updateForumProfiles() {
    const response = await instance.post(route + 'forumProfilesUpdate');
    return response.data;
  },
  async addMatchs(context, data) {
    const response = await instance.post(route + 'matchsAdd', data)
    return response.data
  },
  async addTeam(context, data) {
    const response = await instance.post(route + 'teamAdd', data)
    return response.data
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
