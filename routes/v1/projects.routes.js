const express = require('express');
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
} = require('../../controllers/v1/projects.controller');
const authMiddleware = require('../../middleware/authMiddleware'); // Add authentication middleware if needed

const router = express.Router();

/**
 * Create a new project.
 *
 * @name POST /projects
 * @function
 * @memberof module:routes/project~router
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/projects', authMiddleware, createProject);

/**
 * Fetch all projects.
 *
 * @name GET /projects
 * @function
 * @memberof module:routes/project~router
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/projects', getAllProjects);

/**
 * Fetch a single project by ID.
 *
 * @name GET /projects/:id
 * @function
 * @memberof module:routes/project~router
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/projects/:id', getProjectById);

/**
 * Update a project by ID.
 *
 * @name PUT /projects/:id
 * @function
 * @memberof module:routes/project~router
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.put('/projects/:id', authMiddleware, updateProjectById);

/**
 * Delete a project by ID.
 *
 * @name DELETE /projects/:id
 * @function
 * @memberof module:routes/project~router
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.delete('/projects/:id', authMiddleware, deleteProjectById);

module.exports = router;
