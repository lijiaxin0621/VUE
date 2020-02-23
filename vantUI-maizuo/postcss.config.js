module.exports = {
 /*  plugins: {
    autoprefixer: {},
    "postcss-pxtorem" :{
      "rootValue":75,
      "propList":["*"],
  }
} */
plugins: {
  'autoprefixer': {
    browsers: ['Android >= 4.0', 'iOS >= 7']
  },
  'postcss-pxtorem': {
    rootValue: 37.5,
    propList: ['*']
  }
}
}
