const User = require('./users.model')
const bcrypt = require('bcrypt')
const { setError } = require('../../utils/error/error')
const { generateSign, verifyJwt } = require('../../utils/jwt/jwtUtils')

const postNewUser = async (req, res, next) => {

    try {

        const newUser = new User(req.body)
        const userDuplicate = await User.findOne({ email: newUser.email })

        if (userDuplicate) {

            return next(setError(404, 'Email existente'))

        }

        const userDB = await newUser.save()
        return res.status(201).json({ name: userDB.name, email: userDB.email, old: userDB.old })

    } catch (error) {

        return next(error)

    }
}

const loginUser = async (req, res, next) => {

    try {

        const userDB = await User.findOne({ email: req.body.email })

        if (!userDB) {

            return next(setError(404, 'User not found'))

        }

        if (bcrypt.compareSync(req.body.password, userDB.password)) {

            const token = generateSign(userDB._id, userDB.email)
            return res.status(200).json(token)

        }

    } catch (error) {

        error.message = 'error Login'
        return next(error)

    }
}

const logoutUser = (req, res, next) => {

    try {
        
        const token = null;
        return res.status(200).json(token);

    } catch (error) {

        return next(error)

    }
}

const getAllUsers = async (req, res, next) => {

    try {
        
        const userDB = await User.find();

        if (!userDB) {

            return next(setError(404, "There aren't user's yet"));

        }

        res.status(200).json(userDB);

        return res.status(200).json({ name: userDB.name, email: userDB.email, old: userDB.old })

    } catch (error) {

        return next(setError(404, 'User server fail'))

    }
}

const patchUser = async (req, res, next) => {
    
    try {

        const { id } = req.params
        const patchUser = new User(req.body)

        patchUser._id = id

        if (req.file) {

            patchUser.img = req.file.path

        }

        const UserDB = await User.findByIdAndUpdate(id, patchUser)

        if (!UserDB) {

            return next(setError(404, "User not found"))

        }

        return res.status(200).json({ new: patchUser, old: UserDB })

    } catch (error) {

        return next(setError(500, "User cant be replaced 🐿"))

    }

}

module.exports = {

    postNewUser,
    loginUser, 
    logoutUser, 
    getAllUsers,
    patchUser,

}