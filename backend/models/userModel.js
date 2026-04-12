const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'user must have a name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'user must have a email'],
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'user must have a password'],
        minLength: [8, 'password must be atleast 8 characters long'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'user must have a password for confirmation'],
        validate: {
            validator: function(pass){
                return pass === this.password;
            },
            message: ['passwords are not the same']
        }
    },
    passwordChangedAt: Date,
    dateOfBirth: {
        type: String,
        required: [true, 'user must have a date of birth'],
        validate: {
            validator: function (d) {
                if(d == '-') return true;
                if (!d) return false;
                const ms = Date.now() - new Date(d).getTime();
                const years = ms / (365.25 * 24 * 60 * 60 * 1000);
                return years >= 18;
            },
            message: 'User must be at least 18 years old',
        },
    },
    photo: {
        type: String,
        default: `/assets/default.jpg`
    },
    address: {
        type: String,
        required: [true, 'user must have a address'],
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user','admin']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    isGoogleLogin: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
});

userSchema.pre('save', function(){
    if(!this.isModified('password') || this.isNew) return;
    
    this.passwordChangedAt = Date.now() - 1000;
});

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
}

userSchema.methods.correctPassword = async(enteredPassword, actualPassword) => {
    return await bcrypt.compare(enteredPassword, actualPassword);
}

userSchema.methods.isPasswordChanged = function(jwtAssignedAt){
    if(this.passwordChangedAt){
        const changeTime = parseInt(this.passwordChangedAt.getTime() , 10);
        return changeTime > jwtAssignedAt * 1000;
    }
}

const userModel = new mongoose.model('User', userSchema);

module.exports = userModel;