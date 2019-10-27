import axios from 'axios'
const instance = axios.create({
	baseURL: 'http://bbbl.fr/backend/',
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	}
});
const route = 'vue-routes.php?action='

const state = {
	competition: {},
	statistics: [],
	calendar: {}
}

const mutations = {
	setCompetition(state, payload) {
		state.competition = payload;
	},
	setCalendar(state, payload) {
		state.calendar = payload;
	}
}

const actions = {
	fetchCompetition(context, id) {
		console.log(instance);
		instance.post(route + 'competition', {
				id: id
			})
			.then(response => {
				context.commit('setCompetition', response.data);
				context.dispatch('fetchCalendar', id);
			}, error => {
				console.error(error);
			});
	},
	updateCompetition(context, params) {
		instance.post(route + 'competitionUpdate', params)
			.then(response => {
				context.commit('setCompetition', response.data);
				context.dispatch('fetchCalendar', id);
			}, error => {
				console.error(error);
			});
	},
	fetchCalendar(context, id) {
		instance.post(route + 'competitionCalendar', [id])
			.then(response => {
				context.commit('setCalendar', response.data.slice()
					.reverse());
			}, )
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}