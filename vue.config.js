module.exports = {
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg');

		svgRule.uses.clear();

		svgRule
			.use('vue-svg-loader')
			.loader('vue-svg-loader');
	},
	css: {
		loaderOptions: {
			sass: {
				data: `
        @import "@/assets/styles/_main.scss";
        @import "@/assets/styles/_helmets.scss";
        `
			}
		}
	},
	publicPath: process.env.NODE_ENV === 'production' ?
		'/dist/' : '/vue/'
};