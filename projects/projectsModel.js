const db = require('knex')(require('../knexfile').development)

function getProjects() {
  return db('projects')
}

function getProjectsById(id) {
  return db('projects')
    .where({ id })
    .first()
}

function getProjectTasks(id) {
  return db('tasks AS t')
    .join('projects AS p', 't.projectId', 'p.id')
    .where({ 'p.id': id })
    .select('t.*', 'p.name AS Project Name', 'p.description AS Project Description')
}

function getProjectResources(id) {
  return db('projects_resources AS ref')
    .join('projects AS p', 'ref.projectId', 'p.id')
    .join('resources AS r', 'ref.resourceId', 'r.id')
    .where({ 'p.id': id })
    .select('r.*')
}

async function addProject(project) {
  const [id] = await db('projects')
  .insert(project)

  return getProjectsById(id)
 }

 function updateProject(id, project) {

 }

 function deleteProject(id) {

 }

 async function addTaskToProject(task) {
   const [id] = await db('tasks')
   .insert(task)

   return db('tasks')
   .where({ id })
 }

function addResourceToProject(projectId, resourceId) {
  return db('projects_resources')
  .insert({ projectId, resourceId })
}

module.exports = {
  getProjects,
  getProjectTasks,
  getProjectResources,
  addProject,
  updateProject,
  deleteProject,
  getProjectsById,
  addTaskToProject,
  addResourceToProject
}