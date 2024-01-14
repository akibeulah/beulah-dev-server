const Project = require('../../models/projects');

/**
 * Create a new project.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Created project.
 * @throws {Error} If an error occurs during project creation.
 */
const createProject = async (req, res) => {
    try {
        const { title, description, githubLink, technologies, images } = req.body;

        const newProject = new Project({
            title,
            description,
            githubLink,
            technologies,
            images,
        });

        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Fetch all projects.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of projects.
 * @throws {Error} If an error occurs during fetching.
 */
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Fetch a single project by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - The requested project.
 * @throws {Error} If an error occurs during fetching or if the project is not found.
 */
const getProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Update a project by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - The updated project.
 * @throws {Error} If an error occurs during updating or if the project is not found.
 */
const updateProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { $set: req.body },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Delete a project by ID.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - The deleted project.
 * @throws {Error} If an error occurs during deletion or if the project is not found.
 */
const deleteProjectById = async (req, res) => {
    const projectId = req.params.id;

    try {
        const deletedProject = await Project.findByIdAndRemove(projectId);

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(deletedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
};