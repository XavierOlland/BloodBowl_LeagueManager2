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
	calendar: []
}

const getters = {
	getRound: (state) => (round) => {
		console.log(state.calendar); // eslint-disable-line no-console
		if(round==0){
			return state.calendar.find(day => day.round === day.currentRound)
		}
		else {
			return state.calendar.find(day => day.round === round)
		}
	}
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
	async fetchCompetition(context, id) {
		instance.post(route + 'competition', {
				id: id
			})
			.then(response => {
				context.commit('setCompetition', response.data);
				context.dispatch('fetchCalendar', id);
			}, error => {
				console.error(error); // eslint-disable-line no-console
			});
	},
	async updateCompetition(context, params) {
		return instance.post(route + 'competitionUpdate', params)
			.then(response => {
				context.commit('setCompetition', response.data);
				//context.dispatch('fetchCalendar', params[1]);
			}, error => {
				console.error(error); // eslint-disable-line no-console
			});
	},
	async fetchCalendar(context, id) {
		return instance.post(route + 'competitionCalendar', [id])
			.then(response => {
				context.commit('setCalendar', response.data.slice()
					.reverse());
			}, )
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
