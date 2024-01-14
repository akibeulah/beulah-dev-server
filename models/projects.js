const mongoose = require('mongoose');

/**
 * Project Schema
 *
 * @typedef {object} Project
 * @property {string} title - The title of the project.
 * @property {string} description - The description of the project.
 * @property {string} githubLink - The GitHub repository link.
 * @property {string} mediumLink - The Medium repository link.
 * @property {string} linkedInLink - The LinkedIn repository link.
 * @property {string[]} technologies - An array of technologies used in the project.
 * @property {string[]} images - An array of image URLs related to the project.
 */

const projectsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    githubLink: {
        type: String,
    },
    mediumLink: {
        type: String,
    },
    linkedInLink: {
        type: String,
    },
    technologies: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],

    },
});

const Project = mongoose.model('Projects', projectsSchema);

module.exports = Project;
