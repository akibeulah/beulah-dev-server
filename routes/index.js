const userRoutes = require('./v1/user.routes');
const messagesRoutes = require('./v1/messages.routes');
const projectRoutes = require("./v1/projects.routes")

const v1RoutesArr = [
    userRoutes,
    projectRoutes,
    messagesRoutes
]

module.exports = v1RoutesArr
