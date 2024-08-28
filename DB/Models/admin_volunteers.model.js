// admin_volunteers model use mongoose
/*
1. firstName 
2. secondName
3- thirdName
4- fourthName
5- fullName( firstName + secondName + thirdName + fourthName ) 
6. SSN ⇒ ( unique )
7. age 
8. gender (male , female)
9.comment
*/

import mongoose from "mongoose";
import { systemRoles } from "../../src/utils/system-roles.utils.js";

const { Schema, model } = mongoose;

const admin_volunteersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    secondName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    thirdName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    fourthName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    SSN: {
      type: Number,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["female", "male"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      default: Date.now,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(systemRoles),
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    supervisor: {
      type:Boolean,
      default : false
  },
  },
  {
    timestamps: true,
    versionKey: "version_key",
  }
);

const Admin_Volunteers =
  mongoose.models.Admin_Volunteers ||
  model("Admin_Volunteers", admin_volunteersSchema);
export default Admin_Volunteers;
