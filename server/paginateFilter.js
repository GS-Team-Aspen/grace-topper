/* const paginateFilter = require('/paginateFilter')
 * const limit = 21
 * const page = 5
 * const itemsSearch = {
 *     limit,
 *     where: {stock: {[Op.gt]: 0}},
 *     include: [{model: Category}],
 *     attributes: ['id', 'name', 'price', 'imageUrl'],
 *     offset: limit * (page - 1)
 * }
 * const items = await paginateFilter(itemsSearch, Item)
 *  */

module.exports = async (options, model) => {
  return await model.findAll({...options})
}
