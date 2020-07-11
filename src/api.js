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

export {
  create,
}