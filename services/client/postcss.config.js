module.exports = ({ file, options, env }) => ({
  plugins: [
    require("autoprefixer")({
      browsers: ["last 2 versions", "iOS >= 7.1", "Android >= 4"],
      cascade: false
    })
  ]
});
