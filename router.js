// for use in the server or in the client side, from Konstantin Tarkus

import createHistory from 'history/lib/createBrowserHistory'
import useQueries from 'history/lib/useQueries'
// as 'singleton'
export default useQueries(createHistory)()

// using react 
import {React, Component} from 'react'
import history from '../history'

class App extends Component {
  transition = event => {
    event.preventDefault()
    history.push({
      pathname: event.currentTarget.pathname,
      search: event.currentTarget.search
    })
  }
  render() {
    return (
      <ul>
        <li><a href="/" onClick={this.transition}>Home</a></li>
        <li><a href="/one" onClick={this.transition}>One</a></li>
        <li><a href="/two" onClick={this.transition}>Two</a></li>
      </ul>
    )
  }
}

// creating routes
const routes = {
  path: '/tasks/:id(\\d+)',
  async action({ params }) {
    const resp = await fetch(`/api/tasks/${params.id}`)
    const data = await resp.json()
    return data && <TaskDetails {...data} />
  }
}

// from other component 
import React from 'react'
import Layout from '../components/Layout'
class AboutPage extends Component {
  render() {
    return (
      <Layout title="About Us" breadcrumbs="Home > About">
        <h1>Welcome!</h1>
        <p>Here your can learn more about our product.</p>
      </Layout>
    );
  }
}
export default AboutPage

//------------------------------------------
import toRegex from 'path-to-regexp'
function matchURI(path, uri) {
  const keys = [];
  const pattern = toRegex(path, keys); // TODO: Use caching
  const match = pattern.exec(uri);
  if (!match) return null;
  const params = Object.create(null);
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] =
      match[i] !== undefined ? match[i] : undefined;
  }
  return params;
}
async function resolve(routes, context) {
  for (const route of routes) {
    const uri = context.error ? '/error' : context.pathname
    const params = matchURI(route.path, uri)
    if (!params) continue
    const result = await route.action({ ...context, params })
    if (result) return result
  }
  const error = new Error('Not found')
  error.status = 404
  throw error
}
export default { resolve }

// ---------------------------------------------
const toUrlPath = pathToRegexp.compile('/tasks/:id(\\d+)')
toUrlPath({ id: 123 }) //=> "/user/123"

// On main entry point
import ReactDOM from 'react-dom'
import history from './history'
import router from './router'
import routes from './routes'

const container = document.getElementById('root')
function renderComponent(component) {
  ReactDOM.render(component, container)
}
function render(location) {
  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => router.resolve(routes, { ...location, error })
    .then(renderComponent))
}
render(history.getCurrentLocation()) // render the current URL
history.listen(render)              // render subsequent URLs
toUrlPath({ id: 'abc' }) /=> error, does not match the \d+ constraint
