const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const config = require('../config/config')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String, 
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    }
  }

)

userSchema.statics.emailExists = async function (email) {
  const user = await this.findOne({email: email})
  return !!user
}

userSchema.methods.passwordMatches = async function (password) {
  const user = this
  return await bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (next) {
  let user = this;
  if (!user.isModified('password')) {
    return next()
  }
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
})


const User = mongoose.model('User', userSchema)


module.exports = User;

