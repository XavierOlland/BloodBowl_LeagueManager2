import axios from 'axios'
const instance = axios.create({
	baseURL: process.env.VUE_APP_BACKENDURL,
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	}
});
const route = 'vue-routes.php?action=';
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
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
