module.exports = themeOptions => {
  const basePath = themeOptions.basePath || `/`;
  const postType = themeOptions.postType;
  const componentMap = themeOptions.componentMap;
  const extraTitles = themeOptions.extraTitles || {}
  
  const ignorePages = [
    `/dev-404-page/`,
    `/404/`,
    `/404.html`,
    `/mail/`,
    `/offline-plugin-app-shell-fallback`,
  ];

  return {
    basePath,
    postType,
    componentMap,
    ignorePages,
    extraTitles,
  }
}