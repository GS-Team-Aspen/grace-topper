module.exports = (content, page, limit) => {
  const start = (page - 1) * limit
  const end = page * limit

  const results = {}

  if (end < content.length) {
    results.next = {
      page: page + 1,
      limit
    }
  }
  if (start > 0) {
    results.previous = {
      page: page - 1,
      limit
    }
  }

  results.data = content.slice(start, end)
  return results
}
