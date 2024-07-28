import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const Address = new Schema({
  houseNumber: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
});

const userSchema = new Schema({
  userName: { type: String, min: [2, "userName is too short.."] },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    min: [6, "password is too short..."],
  },
  phoneNumber: {
    type: Number,
  },
  address: { type: [Address], default: [] },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    next();
  } catch (err) {
    console.log(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id, email: this.email },
    process.env.PRIVATE_KEY
  );
  return token;
};

const Users = model("Users", userSchema);

export default Users;
