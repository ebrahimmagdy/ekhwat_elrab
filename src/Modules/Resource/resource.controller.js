// add resource

import Resource from "../../../DB/Models/resource.model.js";
import { ErrorClass } from "../../utils/error-class.utils.js";

/*
1- destruct data from body
2- take new instance from resource
3- save data in database
4- return resource created successfully
*/

export const addResource = async (req, res, next) => {
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

  // destruct data from body
  const { name, quantity, type } = req.body;

  // check if resource exist
  const resource = await Resource.findOne({ name });
  if (resource) {
    // return error if resource exist
    return next(
      new ErrorClass("Resource already exist", 400, "name", "Add Resource API")
    );
  }
  // take new instance
  const newResource = new Resource({
    name,
    quantity,
    type,
    addedBy: req.authUser._id,
  });

  // save data in database
  const savedResource = await newResource.save();

  // return resource created successfully
  return res
    .status(200)
    .json({ message: "Resource created successfully", savedResource });
};
//-------------------------------
//get all resource

export const getAllResource = async (req, res, next) => {
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

  // find all resource
  const resources = await Resource.find();
  // return all resource
  return res.status(200).json({count : resources.length , resources });
}

