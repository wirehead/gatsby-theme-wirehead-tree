/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { joinPath, urlResolve, createContentDigest } = require(`gatsby-core-utils`)
const fs = require("fs")

const withDefaults = require(`./util/default-options`)

let titles = {}

const mapComponent = (postType, componentMap, compType) => {
  let comp = postType
  if (componentMap[compType]) {
    comp = componentMap[compType]
  }
  return comp;
}

const genBasePath = prefix => {
  if (prefix) {
    return prefix;
  } else {
    return '/';
  }
}

const stripTrailingSlash = str => {
  if (str === '/') {
    return '/'
  } else {
    return str.endsWith("/") ? str.slice(0, -1) : str
  }
}

const getDepthFromPath = str => {
  return str.substr(1).split("/").length
}

const getParentFromPath = str => {
  return str
    .split("/")
    .slice(0, -1)
    .join("/")
}

const toPagePath = (node, base) => {
  const { dir } = path.parse(node.parent.relativePath)
  if (node.parent.name === 'index') {
    return urlResolve(base, dir)
  } else {
    return urlResolve(base, dir, node.parent.name)
  }
}

const toBreadcrumb = (basePath, path, names) => {
  const arr = path.substr(1).split("/")
  const rootCrumb = [
    {
      url: "/",
      name: names["/"]
    },
  ]
  let curPath = ""
  const childCrumbs = arr.map(dir => {
    let name = dir
    curPath = joinPath(curPath,dir);
    const url = urlResolve(basePath, curPath)
    if (names[url]) {
      name = names[url]
    }
    return {
      name,
      url,
    }
  })
  return rootCrumb.concat(childCrumbs)
}


exports.onCreatePage = ({ page, pathPrefix, actions }, themeOptions) => {
  const {ignorePages} = withDefaults(themeOptions);

  const basePath = genBasePath(pathPrefix);

  const pagePath = stripTrailingSlash(page.path)
  const title = page.context.title || titles[pagePath];
  const depth = getDepthFromPath(pagePath);
  const parent = getParentFromPath(pagePath);

  if (!ignorePages.includes(page.path)) {
    const { createPage, deletePage } = actions
    const oldPage = Object.assign({}, page)
    // Replace new page with old page
    if (oldPage.path === "/") {
      deletePage(oldPage)
      createPage({
        ...page,
        context: {
          ...page.context,
          depth: 0,
          title: titles["/"],
        },
      })
    } else {
      deletePage(oldPage)
      createPage({
        ...page,
        context: {
          ...page.context,
          title,
          depth,
          parent,
          breadcrumbs: toBreadcrumb(basePath, pagePath, titles),
        },
      })
    }
  }
}

exports.onPreBootstrap = ({ store }, themeOptions) => {
  const {extraTitles} = withDefaults(themeOptions);
  titles = extraTitles;
}

exports.createPages = async ({ actions, graphql, pathPrefix, reporter }, themeOptions) => {
  const {postType, componentMap} = withDefaults(themeOptions);

  const basePath = genBasePath(pathPrefix);

  const { createPage } = actions;

  const cacheTitle = ({ node }) => {
    const pagePath = toPagePath(node, basePath)
    let title = node.parent.name
    if (node.frontmatter.title != "") {
      title = node.frontmatter.title
    }
    titles[pagePath] = title
  }

  const jsFrontmatter = await graphql(`{
    allJavascriptFrontmatter {
      edges {
        node {
          id
          frontmatter {
            title
          }
          parent {
            ... on File {
              name
              base
              relativePath
              relativeDirectory
              sourceInstanceName
            }
          }
        }
      }
    }
  }
  `)

  // Handle errors
  if (jsFrontmatter.errors) {
    console.error(jsFrontmatter.errors)
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  jsFrontmatter.data.allJavascriptFrontmatter.edges.forEach(cacheTitle)

  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fileAbsolutePath
            parent {
              ... on File {
                name
                base
                relativePath
                relativeDirectory
                sourceInstanceName
              }
            }
            frontmatter {
              title
              date
              type
              description
            }
            excerpt(pruneLength: 300)
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    console.error(result.errors)
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMdx.edges.forEach(cacheTitle)
  result.data.allMdx.edges.forEach(({ node }) => {
    const pagePath = toPagePath(node, basePath)
    const title = titles[pagePath]
    const depth = getDepthFromPath(pagePath);
    const comp = mapComponent(postType, componentMap, node.frontmatter.type);

    createPage({
      path: pagePath,
      component: comp,
      context: {
        id: node.id,
        parent: "/" + node.parent.relativeDirectory,
        name: node.parent.name,
        depth: depth,
        title: title,
        type: node.frontmatter.type,
        date: node.frontmatter.date,
        breadcrumbs: toBreadcrumb(basePath, pagePath, titles),
        excerpt: node.frontmatter.description || node.excerpt,
      },
    })
  })
}
