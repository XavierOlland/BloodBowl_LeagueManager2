import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import competition from './modules/competition.js'
const moment = require('moment')

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		competition
	},
	state: {
		dictionnary: [],
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
					context.dispatch('upcomingGames')
				}, error => {
					console.error(error);
				});
		},
		async upcomingGames(context) {
			axios.get(process.env.VUE_APP_BACKENDURL + "action=upcomingGames")
				.then(response => {
					const calendar = response.data ? response.data : {};
					context.commit('setCalendar', calendar);
				}, error => {
					console.error(error);
				});
		},

	}
})