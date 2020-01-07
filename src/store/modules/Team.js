import axios from 'axios'
const instance = axios.create({
	baseURL: 'http://bbbl.fr/backend/',
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	}
});
const route = 'vue-routes.php?action='

const state = {
	team: {},
}

const mutations = {
	setTeam(state, payload) {
		state.match = payload;
	}
}

const actions = {
	fetchMatch(context, id) {
		instance.post(route + 'team', [id])
			.then(response => {
				var team = JSON.parse(response.data.json)
					.team;
				context.commit('setTeam', match);
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