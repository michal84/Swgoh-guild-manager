import axios from 'axios'
import authHeader from '../utils/headers'
import { logout } from '../utils/auth'

function get(url, params) {
  return axios.get(url, {
    ...params,
    headers: authHeader(),
  }).then(
    response => response,
    (error) => {
      if (error.response.data.error === undefined) {
        logout()
      }
    },
    )
}
function post(url, params) {
  console.log('parameters in request ', params);
  return axios.post(url, {
    ...params,
  },
    {
      headers: authHeader(),
    },
  )
}
function patch(url, params) {
  return axios.patch(url, {
    ...params,
  },
    {
      headers: authHeader(),
    },
  )
}
function remove(url) {
  return axios.delete(url,
    {
      headers: authHeader(),
    },
  )
}

export {
  get,
  patch,
  post,
  remove,
}
