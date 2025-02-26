import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
      type: String,
      required: true
  },
    email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

userSchema.pre("save",async function (next) {
  const user = this;
  if(!user.isModified("password")){
    next();
  }
  try{
    const saltRound = await bcrypt.genSalt(10);
    const hash_Password= await bcrypt.hash(user.password, saltRound);
    user.password= hash_Password;
  }
  catch(error){
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
export {User};