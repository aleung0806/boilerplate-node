const mongoose = require('mongoose');

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


const User = mongoose.model('User', userSchema)


module.exports = User;

