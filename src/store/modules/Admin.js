import axios from 'axios'
const instance = axios.create({
	baseURL: 'http://bbbl.fr/backend/',
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	}
});
const route = 'admin/admin.php?action='
const state = {
	ingameCompetitions: [],
}

const mutations = {
	setIngameCompetitions(state, payload) {
		state.ingameCompetitions = payload;
	}
}

const actions = {
	async seasonArchive(context) {
		const response = await instance.post(route + 'seasonArchive')
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
	addCompetition(context, params) {
		instance.post(route + 'competitionAdd', params)
			.then(response => {
				console.log(response); // eslint-disable-line no-console
			})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}