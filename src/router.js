import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Competition from './views/Competition.vue'
import Match from './views/Match.vue'
import Team from './views/Team.vue'

Vue.use(Router)


export default new Router({
	mode: '',
	base: '/',
	routes: [{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/competition/:id',
			name: 'Competition',
			component: Competition
		},
		{
			path: '/match/:id',
			name: 'Match',
			component: Match
		},
		{
			path: '/team/:id',
			name: 'Team',
			component: Team
		}
	]
})