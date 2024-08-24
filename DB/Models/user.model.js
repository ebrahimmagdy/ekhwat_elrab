// user model use mongoose
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


const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema(
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
    comment: {
      type: String,
      trim: true,
      minLength: 3,
    },
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin_Volunteers",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: "version_key",
  }
);

const User = mongoose.models.User || model("User", userSchema);
export default User;
