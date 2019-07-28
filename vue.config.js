module.exports = {
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
    '/dist/' :
    '/'
};
