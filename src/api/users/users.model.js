// mongoose significa mangosta y nos gusta
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { validationPassword } = require("../../utils/validators/validators.js");
const { setError } = require("../../utils/error/error.js");

const userSchema = new Schema({

    name: {

        type: String, 
        trim: true,
        required: true

    },
    email: {

        type: String, 
        trim: true,
        required: true,
        unique: true,

    },
    old: {

        type: Number,
        trim: true,
        required: true,

    },
    password: {

        type: String,
        trim: true,
        required: true,

    }

}, 
{

    timestamps: true,

});

userSchema.pre("save", function (next) {

    if (!validationPassword(this.password)) {
        
        return next (setError(400, "No sabes ni poner una contraseña crack"));

    }

    this.password = bcrypt.hashSync(this.password, 10);

    next();

});

const User = mongoose.model("users", userSchema);

module.exports = User;