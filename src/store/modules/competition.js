import axios from 'axios'

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
		axios.post('http://bbbl.fr/backend/vue-routes.php?action=competition', {
				id: id
			}, {
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				}
			})
			.then(response => {
				context.commit('setCompetition', response.data);
				context.dispatch('fetchCalendar', id);
			}, error => {
				console.error(error);
			});
	},
	fetchCalendar(context, id) {
		axios.post('http://bbbl.fr/backend/vue-routes.php?action=competitionCalendar', [id], {
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				}
			})
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