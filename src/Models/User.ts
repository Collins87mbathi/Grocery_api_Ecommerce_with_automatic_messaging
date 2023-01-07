import { Schema, Model, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/UserType";

const UserSchema: Schema<IUser> = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: [
    {
      type: Array,
    },
  ],
  orders: [
    {
      type: Array,
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre<IUser>("save", async function (next: any) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User: Model<IUser> = model("User", UserSchema);
