/**
 * @description - Expiration model
 * recourceId
 * quantity
 * expirationDate
 * addedBy
 * startDate
 */
// model

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const expirationSchema = new mongoose.Schema(
  {
    recourceId: {
      type: Schema.Types.ObjectId,
      ref: "resource",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin_Volunteers",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("expiration", expirationSchema);
