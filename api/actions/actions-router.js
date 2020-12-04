const express = require('express')

const router = express.Router()

const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

router.get('/',  async (__, res) => {
    try {
        const allActions = await Actions.get()
        res
            .status(200)
            .json(allActions)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not retrieve Actions.'})
    }
})

router.get('/:id',  async (req, res) => {
    const { id } = req.params
    try {
        const action = await Actions.get(id)
        res
            .status(200)
            .json(action)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not retrieve Actions.'})
    }
})

router.post('/', projectChecker,  async (req, res) => {
    try {
        const newAction = await Actions.insert(req.body)
        res
            .status(201)
            .json(newAction)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not post new Action.'})
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body
    try {
        const updatedAction = await Actions.update(id, changes)
        res
            .status(204)
            .json(updatedAction)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not update Action.'})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedAction = await Actions.remove(id)
        res
            .status(200)
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Could not remove Action.'})
    }
})

async function projectChecker(req, res, next) {
    const { project_id } = req.body
    Projects.get(project_id)
        .then((project) => {
            if(project) {
                next()
            } else {
                res
                    .status(400)
                    .json({ message: 'Project id given is invalid.'})
            }
        })
        .catch((err) => {
            res
                .status(500)
                .json({ message: 'Project with id given was able to be retrieved.'})
        })

}

module.exports = router
