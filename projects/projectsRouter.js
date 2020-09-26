const router = require('express').Router()

const db = require('./projectsModel')

router.use('/:id', verifyId)

router.get('/', (req, res) => {
  db.getProjects()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({ message: 'Sorry, something went wrong', error: err })
    })
})

router.get('/:id', (req, res) => {
  res.status(200).json(req.project)
})

router.get('/:id/tasks', (req, res) => {
  const { id } = req.params
  db.getProjectTasks(id)
    .then(tasks => {
      res.status(200).json(tasks)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Sorry, something went wrong', error: err })
    })
})

router.get('/:id/resources', (req, res) => {
  const { id } = req.params
  db.getProjectResources(id)
    .then(resources => {
      res.status(200).json(resources)
    })
    .catch(err => {
      res.status(500).json({ message: 'Sorry, something went wrong', error: err })
    })
})

router.post('/', verifyProjectSchema, (req, res) => {
  db.addProject(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Sorry, something went wrong', error: err })
    })
})

router.post('/:id/tasks', verifyTaskSchema, (req, res) => {
  db.addTaskToProject(req.body)
    .then(task => {
      res.status(201).json(task)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Sorry, something went wrong', error: err })
    })
})

router.post('/:id/resources', (req, res) => {
  db.addResourceToProject(req.project.id, req.body.id)
    .then(id => {
      res.status(201).json({ message: `Successfully added ${req.body.name} to ${req.project.name}` })
    })
    .catch(err => {
      res.status(500).json({ message: 'Sorry, something went wrong', error: err })
    })
})

function verifyTaskSchema(req, res, next) {
  const { description } = req.body
  if (description) {
    req.body.projectId = req.params.id
    next()
  }
  else {
    res.status(400).json({ message: 'Please include a description for your task' })
  }
}

function verifyProjectSchema(req, res, next) {
  const { name } = req.body
  if (name) {
    next()
  }
  else {
    res.status(400).json({ message: 'Please include a name for your project' })
  }
}


function verifyId(req, res, next) {
  const { id } = req.params
  db.getProjectsById(id)
    .then(project => {
      if (project) {
        req.project = project
        next()
      }
      else {
        res.status(404).json({ message: 'Sorry, a project with that id could not be found' })
      }

    })
    .catch(err => {
      req.status(500).json({ message: 'Sorry, something went wrong', error: err })
    })
}


module.exports = router