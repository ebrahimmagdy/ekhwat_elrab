import Family from "../../../DB/Models/family.model.js";
import Need from "../../../DB/Models/need.model.js";
import User from "../../../DB/Models/user.model.js";
import { ErrorClass } from "../../utils/error-class.utils.js";

// add needs
export const addNeeds = async (req, res, next) => {
  // check user online
  if (req.authUser.status !== "online") {
    return next(
      new ErrorClass(
        "User must be online",
        400,
        "User must be online",
        "delete user API"
      )
    );
  }
  // destruct data from query
  const { familyId, member } = req.query;
  // check if family exist
  const family = await Family.findById(familyId);
  if (!family) {
    return next(
      new ErrorClass("Family not found", 400, "familyId", "Add Needs API")
    );
  }
  // check if member exist in family from user model
  if (member) {
    const user = await User.findOne({ _id: member, familyId });
    // this user no find in this family
    if (!user) {
      return next(
        new ErrorClass(
          "User not found in this family",
          400,
          "member",
          "Add Needs API"
        )
      );
    }
  }

  // destruct data from body
  const { need, quantity, price } = req.body;

  // take new instance
  const newNeeds = new Need({
    need,
    quantity,
    price,
    addedBy: req.authUser._id,
    familyId,
    member,
  });

  // save data in database
  const savedNeeds = await newNeeds.save();

  // return add needs success
  return res.status(200).json({ message: "Add Needs Success", savedNeeds });
};
//--------------------------------------
// get all needs
export const getAllNeeds = async (req, res, next) => {
  // check user online
  if (req.authUser.status !== "online") {
    return next(
      new ErrorClass(
        "User must be online",
        400,
        "User must be online",
        "delete user API"
      )
    );
  }

  // find all needs
  const needs = await Need.find();
  // return all needs
  return res
    .status(200)
    .json({ count: needs.length, message: "Get All Needs Success", needs });
};
//-------------------------------
// get need by id

export const getNeedById = async (req, res, next) => {
  // check user online
  if (req.authUser.status !== "online") {
    return next(
      new ErrorClass(
        "User must be online",
        400,
        "User must be online",
        "delete user API"
      )
    );
  }
  const { id } = req.params;

  // find need by id
  const need = await Need.findById(id);
  // check need exist
  if (!need) {
    return next(
      new ErrorClass("Need not found", 400, "needId", "Get Need By Id API")
    );
  }
  // return need
  return res.status(200).json({ need });
};
//---------------------------
// get all need specific family

export const getAllNeedByFamily = async (req, res, next) => {
  // check user online
  if (req.authUser.status !== "online") {
    return next(
      new ErrorClass(
        "User must be online",
        400,
        "User must be online",
        "delete user API"
      )
    );
  }

  // destruct data from query
  const { familyId } = req.query;
  // check family exist
  const family = await Family.findById(familyId);
  if (!family) {
    return next(
      new ErrorClass(
        "Family not found",
        400,
        "familyId",
        "Get All Need By Family API"
      )
    );
  }

  // find all need by family
  const needs = await Need.find({ familyId });
  // return all need
  return res.status(200).json({ count: needs.length, needs });
};
