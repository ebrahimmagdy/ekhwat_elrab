import { ErrorClass } from "../../utils/error-class.utils.js";

import Family from "../../../DB/Models/family.model.js";

// add family

/*
1- destruct data from req.body
2- check if familyName exist
3- take new instance 
4- save new instance in database
5- return add family success
*/

export const addFamily = async (req, res,next) => {
  // destruct data from req.body
  const { familyName, comment } = req.body;
  // check if familyName exist
  const family = await Family.findOne({ familyName });
  console.log(
    "family",
    family
  )
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
  });
  // save data in database
  const savedFamily = await newFamily.save();
  // return add family success
  return res.status(200).json({ message: "Add Family Success", savedFamily });
};
