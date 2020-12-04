const express = require('express')

const router = express.Router()

const Projects = require('./projects-model')

router.get('/',  async (__, res) => {
    try {
        const allProjects = await Projects.get()
        res
            .status(200)
            .json(allProjects)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not retrieve projects.'})
    }
})

router.get('/:id',  async (req, res) => {
    const { id } = req.params
    try {
        const project = await Projects.get(id)
        res
            .status(200)
            .json(project)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not retrieve projects.'})
    }
})

router.get('/:id/actions', async (req, res) => {
    const { id } = req.params
    try {
        const projectActions = await Projects.getProjectActions(id)
        res
            .status(200)
            .json(projectActions)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not retrieve project actions.'})
    }
})

router.post('/', async (req, res) => {
    try {
        const newProject = await Projects.insert(req.body)
        res
            .status(201)
            .json(newProject)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not post new project.'})
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body
    try {
        const updatedProject = await Projects.update(id, changes)
        res
            .status(204)
            .json(updatedProject)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not update project.'})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedProject = await Projects.remove(id)
        res
            .status(200)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not remove project.'})
    }
})

module.exports = router
