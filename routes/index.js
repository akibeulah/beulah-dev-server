const userRoutes = require('./v1/user.routes');
const projectRoutes = require("./v1/projects.routes")

const v1RoutesArr = [
    userRoutes,
    projectRoutes
]

module.exports = v1RoutesArr
