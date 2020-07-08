import { render } from './render.js'

let currentRouterView = () => ''
let base = ''

export const createHashRouter = (baseUrl, routes) => {
  base = baseUrl
  const routesMap = new Map() // JS 中 Map 可以实现 LRU 算法
  routes.forEach((route) => {
    routesMap.set(route.path, route.component)
  })

  const go = (path) => {
    if (routesMap.has(path)) {
      window.location.hash = path
    } else throw new Error('url is not exist.')
  }

  const handleHashChange = e => {
    const path = window.location.hash.slice(1) // #/about => /about
    currentRouterView = routesMap.get(path ? path : '/') // 处理 url 没有 hash 时当作首页处理，127.0.0.1/ => 127.0.0.1/#/
    render()
  }

  window.addEventListener('load', handleHashChange)
  window.addEventListener('hashchange', handleHashChange)

  return { go }
}

export const createHistoryRouter = (baseUrl, routes) => {
  // TODO: homework
}

export const RouterView = (props) => currentRouterView(props)
export const RouterLink = (props) => `<a href="${base}${props.url}">${props.text}</a>`
