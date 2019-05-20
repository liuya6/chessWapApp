module.exports = {
  plugins: {
    autoprefixer: {},
    "px2rem-exclude": {
      remUnit: 75,
      exclude: "node_modules|otherFolder"
    },
    "postcss-px2rem": {
      remUnit: 37.5
    }
  }
};
