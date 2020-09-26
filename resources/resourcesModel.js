const db = require('knex')(require('../knexfile').development)

function getResources() {
  return db('resources')
}

function getResourceById(id) {
  return db('resources')
  .where({ id })
  .first()
}

async function addResources(resource) {
  const [id] = await db('reseources')
  .insert(resource)

  return getResourceById(id)
}

function getProjectUsingResource(resourceId) {
  return db('projects_resources AS ref')
  .join('projects AS p', 'ref.projectId', 'p.id')
  .where({ 'ref.resourceId': resourceId })
  .select('p.*')
  .then(res => {
    console.log(res)
    return res
  })
}



module.exports = {
  getResources,
  addResource,
  getResourceById,
  getProjectUsingResource
}