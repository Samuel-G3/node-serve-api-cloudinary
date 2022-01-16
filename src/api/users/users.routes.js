const UserRoutes = require('express').Router()
const { isAdmin } = require('../../middlewares/auth')
const { postNewUser, loginUser, logoutUser, getAllUsers, patchUser } = require('./users.controller')

UserRoutes.post('/', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAdmin], logoutUser)
UserRoutes.get("/", [isAdmin], getAllUsers)
UserRoutes.patch("/:id", [isAdmin], patchUser)

module.exports = UserRoutes;