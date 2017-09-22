module.exports = {
  plugins: [
    require('postcss-cssnext')({
      features: {
        customProperties: false
      }
    }),
    require('postcss-inline-svg'),
    require('cssnano')({
      preset: 'default'
    })
  ]
}
