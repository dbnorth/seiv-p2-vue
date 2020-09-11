console.log(process.env.NODE_ENV);
module.exports = {
  devServer: {
    host: "localhost"
  },

  publicPath: process.env.NODE_ENV === "development" ? "/" : "/api/"
};