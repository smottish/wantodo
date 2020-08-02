function create(want) {
  return fetch('/api/want', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: want,
  })
  .then((response) => response.json())
}

function update(want) {
  return fetch(`/api/want/${want.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: want,
  })
  .then((response) => response.json())
}

export {
  create,
  update,
}