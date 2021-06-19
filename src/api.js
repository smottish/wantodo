let token = ''

// TODO SM (2020-08-02): This is just a placeholder for now,
// needs to be fully implemented.
class APIError extends Error {
  constructor(message, response) {
    super(message)
    this.response = response
  }
}

const checkStatus = (expected) => (response) => {
    if (response.status !== expected) {
        throw new APIError(`Unexpected status: ${response.status}`, response)
    }
    return response
}

function setToken(tok) {
  token = tok
}

function login(accessCode) {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: accessCode}),
  })
  .then(checkStatus(200))
  .then((response) => response.json())
  .then((user) => {
    setToken(user.accessCode)
    return user
  })
}

function list() {
  return fetch('/api/want', {
    method: 'GET',
    headers: { 'token': token },
  })
  .then(checkStatus(200))
  .then((response) => response.json())
}

function create(want) {
  return fetch('/api/want', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    body: JSON.stringify(want),
  })
  .then(checkStatus(200))
  .then((response) => response.json())
}

function update(want) {
  return fetch(`/api/want/${want._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    body: JSON.stringify(want),
  })
  .then(checkStatus(200))
  .then((response) => {
    if (response.status !== 200) {
      throw new APIError("Error updating want", response)
    }

    return response.json()
  })
  .then((updatedFields) => ({
    ...want,
    ...updatedFields,
  }))
}

function del(id) {
  return fetch(`/api/want/${id}`, {
    method: 'DELETE',
    headers: { 'token': token },
  })
  .then((response) => {
    if (response.status !== 200) {
      throw new APIError("Error deleting want", response)
    }
    return response.json()
  })
}

// TODO: Accept an object of key/value that we will use
// to build query-params with a third-party library
function random(exclude=null) {
  let url = '/api/random'
  if (exclude !== null) {
    url = url + `?exclude=${exclude}`
  }

  return fetch(url, {
    method: 'GET',
    headers: { 'token': token },
  })
  .then(checkStatus(200))
  .then((response) => response.json())
}

function getUser() {
  return fetch('/api/user', {
    method: 'GET',
    headers: { 'token': token },
  })
  .then(checkStatus(200))
  .then((response) => response.json())
}

export {
  create,
  update,
  del,
  list,
  login,
  random,
  getUser,
  setToken,
}
