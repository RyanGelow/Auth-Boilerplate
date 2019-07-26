const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const validateEmail = function(email) {
    return validator.isEmail(email);
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: [
            validateEmail, 
            'Please enter a valid email address.'
        ]
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function(next) {
    // For clarification user about to be saved === "this"
    const user = this;
    try{ 
        // Salt is random characters to help encrypt passwords -- one way street
        const salt = await bcrypt.genSalt();
        console.log('salt', salt);
        // Hash is user password + Salt
        const hash = await bcrypt.hash(user.password, salt);
        console.log('hash', hash);
        user.password = hash;
        next();
    } catch(e){
        return next(e);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword, callback) {
    const user = this;
    try {
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        callback(null, isMatch)
    } catch(e) {
        callback(e);
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;