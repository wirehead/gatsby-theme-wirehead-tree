const withDefaults = require(`./util/default-options`)

module.exports = themeOptions => {
  const options = withDefaults(themeOptions)
  
  return {
    siteMetadata: {
      title: `Blog Title Placeholder`,
      author: `Name Placeholder`,
      description: `Description placeholder`
    },
    plugins: [
    ]
  }
}
