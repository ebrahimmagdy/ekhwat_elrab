/**
 * name -- unique
 * quantity
 * type
 * addedBy
 */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin_Volunteers",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: "version_key",
  }
);

const Resource = mongoose.models.Resource || model("Resource", resourceSchema);

export default Resource;
