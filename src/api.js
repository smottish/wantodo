// TODO SM (2020-08-02): This is just a placeholder for now,
// needs to be fully implemented.
class APIError extends Error {
  constructor(message, response) {
    super(message)
    this.response = response
  }
}

function create(want) {
  return fetch('/api/want', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(want),
  })
  .then((response) => response.json())
}

function update(want) {
  return fetch(`/api/want/${want._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(want),
  })
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
  })
  .then((response) => {
    if (response.status !== 200) {
      throw new APIError("Error deleting want", response)
    }
    return response.json()
  })
}

export {
  create,
  update,
  del,
}
