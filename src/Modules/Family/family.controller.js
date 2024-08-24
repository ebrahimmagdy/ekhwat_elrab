import { ErrorClass } from "../../utils/error-class.utils.js";

import Family from "../../../DB/Models/family.model.js";
import Need from "../../../DB/Models/need.model.js";
import User from "../../../DB/Models/user.model.js";

// add family

/*
1- destruct data from req.body
2- check if familyName exist
3- take new instance 
4- save new instance in database
5- return add family success
*/

export const addFamily = async (req, res, next) => {
  //check user online
  // check status online
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

  // destruct data from req.body
  const { familyName, comment } = req.body;
  // check if familyName exist
  const family = await Family.findOne({ familyName });
  console.log("family", family);
  if (family) {
    // return error if familyName exist
    return next(
      new ErrorClass(
        "Family already exist",
        400,
        "familyName",
        "Add Family API"
      )
    );
  }

  // take new instance
  const newFamily = new Family({
    familyName,
    comment,
    addedBy: req.authUser._id,
  });
  // save data in database
  const savedFamily = await newFamily.save();
  // return add family success
  return res.status(200).json({ message: "Add Family Success", savedFamily });
};

//---------------------------------------------------------------

// get all family

/*
1- find all family
2- return all family
*/

export const getAllFamily = async (req, res) => {
  // check status online
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

  // find all family
  const family = await Family.find();

  // return all family
  return res.status(200).json({ count: family.length, family });
};

//----------------------------------------------------------------

// get family by id

/*
1- find family by id
2- check family exist
3- return family
*/

export const getFamilyById = async (req, res, next) => {
  // check status online
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
  // destruct id from params
  const { id } = req.params;
  // find family by id
  const family = await Family.findById(id);
  //check family exits
  if (!family) {
    return next(
      new ErrorClass("Family not found", 400, "familyId", "Get Family API")
    );
  }
 // return family
  return res.status(200).json({ family });
};

//-----------------------------------------------------------------------

// delete family by id

/*
1- find family by id
2- check family exist
3- delete family
4- return delete family success
*/

export const deleteFamilyById = async (req, res, next) => {
  // check status online
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

  // destruct id from params
  const { id } = req.params;
 
// delte family
  const deletedFamily = await Family.findByIdAndDelete(id);
    if (!deletedFamily) {
      return next(
        new ErrorClass("Family not found", 400, "familyId", "Delete Family API")
      );
    }
  // after delete family deleted all related this family users and needs
  // delete all users
  await User.deleteMany({ familyId: deletedFamily._id });
  // delete all needs
  await Need.deleteMany({ familyId: deletedFamily._id });
  return res
    .status(200)
    .json({ message: "Delete Family Success", deletedFamily });
};

//------------------------------------------------------------------------

// update family by id

/*
1- find family by id
2- check family exist
3- destruct data from req.body
4- update family
5- return update family success
*/

export const updateFamilyById = async (req, res, next) => {
  // check status online
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

  // destruct id from params
  const { id } = req.params;
  const family = await Family.findById(id);
  if (!family) {
    return next(
      new ErrorClass("Family not found", 400, "familyId", "Update Family API")
    );
  }
  const { familyName, comment } = req.body;
  // check if familyName unique
  const familyExist = await Family.findOne({ familyName });
  if (familyExist && familyExist._id.toString() !== id) {
    return next(
      new ErrorClass(
        "Family already exist",
        400,
        "familyName",
        "Update Family API"
      )
    );
  }
  // update family
  const updatedFamily = await Family.findByIdAndUpdate(
    id,
    { familyName, comment },
    { new: true }
  );
  return res
    .status(200)
    .json({ message: "Update Family Success", updatedFamily });
}