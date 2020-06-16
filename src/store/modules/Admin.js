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
  forums: []
}

const mutations = {
  setIngameCompetitions(state, payload) {
    state.ingameCompetitions = payload;
  },
  setCompetitionsForums(state, payload) {
    state.forums = payload;
  }
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
        var ingameCompetitions = response.data;
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
  async addCompetition(context, params) {
    const response = await instance.post(route + 'competitionAdd', params)
    instance.post(route + 'getIngameCompetitions')
    context.commit('setCompetitions', response.data.competitions);
    return response.data
  },
  async updateForumProfiles() {
    const response = await instance.post(route + 'forumProfilesUpdate');
    return response.data;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
