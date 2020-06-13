import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Archives from './views/Archives.vue'
import Competition from './views/Competition.vue'
import Match from './views/Match.vue'
import Team from './views/Team.vue'
import ForumMatch from './views/forum/Match.vue'
import ForumRound from './views/forum/Round.vue'

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
			path: '/admin',
			name: 'Admin',
			component: Admin
		},
		{
			path: '/archives',
			name: 'Archives',
			component: Archives
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
		},
		{
			path: '/forum/match/:id',
			name: 'ForumMatch',
			component: ForumMatch,
		},
		{
			path: '/forum/round/:id',
			name: 'ForumRound',
			component: ForumRound,
		},
	]
})
