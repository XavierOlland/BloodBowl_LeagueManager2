import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import archives from './modules/Archives.js'
import competition from './modules/Competition.js'
import match from './modules/Match.js'
import team from './modules/Team.js'
//const moment = require('moment')

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		archives,
		competition,
		match,
		team
	},
	state: {
		user: {},
		dictionnary: [],
		archives: [],
		competitions: [],
		statistics: [],
		calendar: {}
	},
	getters: {
		getTranslation: (state) => (name) => {
			return state.dictionnary.find(param => param.name == name)
				.translation;
		}
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},
		setDictionnary(state, payload) {
			state.dictionnary = payload;
		},
		setCompetitions(state, payload) {
			state.competitions = payload;
		},
		setStatistics(state, payload) {
			state.statistics = payload;
		},
		setCalendar(state, payload) {
			state.calendar = payload;
		}
	},
	actions: {
		async boot(context) {
			axios.get(process.env.VUE_APP_BACKENDURL + "action=boot")
				.then(response => {
					context.commit('setDictionnary', response.data.parameters);
					context.commit('setCompetitions', response.data.competitions);
					context.commit('setStatistics', response.data.stats);
					context.commit('setUser', window.user);
					context.dispatch('upcomingGames');
				}, error => {
					console.error(error); // eslint-disable-line no-console
				});
		},
		async upcomingGames(context) {
			axios.get(process.env.VUE_APP_BACKENDURL + "action=upcomingGames")
				.then(response => {
					const calendar = response.data ? response.data : {};
					context.commit('setCalendar', calendar);
				}, error => {
					console.error(error); // eslint-disable-line no-console
				});
		},

	}
})