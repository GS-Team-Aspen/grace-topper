module.exports = (content, page, limit) => {
  const start = (page - 1) * limit
  const end = page * limit

  const results = {}

  if (end < content.length) results.next = page + 1
  if (start > 0) results.previous = page - 1

  results.data = content.slice(start, end)
  return results
}
