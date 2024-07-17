// family model use mongoose

/*
1. family name unique 
2. comment
*/

import mongoose from "mongoose";


const { Schema, model } = mongoose;

const familySchema = new mongoose.Schema(
  {
    familyName: {
      type: String,
      required: true,
      unique:true,
      trim: true,
      minLength: 3,
    },
    comment: {
      type: String,
      trim: true,
      minLength: 3,
    },
   
  },
  {
    timestamps: true,
    versionKey: "version_key",
  }
);

const Family = mongoose.models.Family || model("Family", familySchema);
export default Family;
