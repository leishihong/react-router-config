export const isEmpty = data => {
  Object.keys(data).map(item => {
    if (data[ item ] === undefined || data[ item ] === null || data[ item ] === '') {
      delete data[ item ]
    }
  })
  return data
}
