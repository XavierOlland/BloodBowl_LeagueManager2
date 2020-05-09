import axios from 'axios'
const instance = axios.create({
	baseURL: 'http://bbbl.fr/backend/',
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	}
});
const route = 'vue-routes.php?action='
const admin = 'admin/admin.php?action='
const state = {
	archives: [],
}

const mutations = {
	setArchives(state, payload) {
		state.archives = payload;
	}
}

const actions = {
	fetchArchives(context) {
		instance.post(route + 'archives')
			.then(response => {
				var archives = response.data;
				context.commit('setArchives', archives);
			}, error => {
				console.error(error); // eslint-disable-line no-console
			});
	},
	async seasonArchive(context) {
		const response = await instance.post(admin + 'seasonArchive')
		context.commit('setCompetitions', [], {
			root: true
		})
		context.dispatch('fetchArchives');
		return response.data
	},

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}