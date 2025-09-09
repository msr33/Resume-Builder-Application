import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },

  resumes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }
  ]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
