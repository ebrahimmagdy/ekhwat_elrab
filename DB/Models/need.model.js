/**
 * id 
 * familyId
 * need 
 * quantity
 * member // optional
 * price // optional
 */

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const needSchema = new mongoose.Schema(
  {
    familyId: {
      type: Schema.Types.ObjectId,
      ref: "Family",
      required: true,
    },
    need: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
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

const Need = mongoose.models.Need || model("Need", needSchema);

export default Need;
