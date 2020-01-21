module.exports = (content, page, limit) => {
  page = parseInt(page)
  limit = parseInt(limit)

  const start = (page - 1) * limit
  const end = page * limit

  const results = {}

  results.count = content.length
  results.data = content.slice(start, end)
  return results
}
