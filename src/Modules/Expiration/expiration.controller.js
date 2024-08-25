import Expiration from "../../../DB/Models/expiration.model.js";
import Resource from "../../../DB/Models/resource.model.js";
import { ErrorClass } from "../../utils/error-class.utils.js";

// add expiration
export const addExpiration = async (req, res, next) => {
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

  const { resourceId, quantity, expirationDate, startDate } = req.body;
  // check resource exist
  const resource = await Resource.findById(resourceId);
  if (!resource) {
    return next(
      new ErrorClass(
        "Resource not found",
        400,
        "resourceId",
        "add expiration API"
      )
    );
  }

  // create expiration
  const expiration = await Expiration.create({
    resourceId,
    quantity,
    expirationDate,
    addedBy: req.authUser._id,
    startDate,
  });

  return res.status(201).json({ expiration });
};
//----------------------------
//get all expiration

export const getAllExpiration = async (req, res, next) => {
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

  // get all expiration
  const expiration = await Expiration.find();
  return res.status(200).json({ count: expiration.length, expiration });
};
//---------------------------------
// get expiration by id

export const getExpirationById = async (req, res, next) => {
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

  const expiration = await Expiration.findById(id);

  if (!expiration) {
    return next(
      new ErrorClass(
        "Expiration not found",
        400,
        "expirationId",
        "get expiration by id API"
      )
    );
  }

  return res.status(200).json({ expiration });
};
//----------------------------------
//delete resource by id

export const deleteExpirationById = async (req, res, next) => {
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

  const expiration = await Expiration.findByIdAndDelete(id);

  if (!expiration) {
    return next(
      new ErrorClass(
        "Expiration not found",
        400,
        "expirationId",
        "delete expiration by id API"
      )
    );
  }

  return res
    .status(200)
    .json({ message: "Delete Expiration Success", expiration });
};
//--------------------------------
//update expiration by id

export const updateExpirationById = async (req, res, next) => {
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

  const expiration = await Expiration.findById(id);
  if (!expiration) {
    return next(
      new ErrorClass(
        "Expiration not found",
        400,
        "expirationId",
        "update expiration by id API"
      )
    );
  }
  const { resourceId, quantity, expirationDate, startDate } = req.body;
  if (resourceId) {
    expiration.resourceId = resourceId;
    // check resource exist
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return next(
        new ErrorClass(
          "Resource not found",
          400,
          "resourceId",
          "update expiration by id API"
        )
      );
    }
  }

  if (quantity) {
    expiration.quantity = quantity;
  }
  if (expirationDate) {
    expiration.expirationDate = expirationDate;
  }
  if (startDate) {
    expiration.startDate = startDate;
  }
  await expiration.save();
  return res
    .status(200)
    .json({ message: "Update Expiration Success", expiration });
};

export const getAllExpiringByNumberOfDay = async (req, res, next) => {
  // Check if user is online
  if (!req.authUser || req.authUser.status !== "online") {
    return next(
      new ErrorClass(
        "User must be online",
        400,
        "User must be online",
        "get all expiring products API"
      )
    );
  }

  // Destruct data from query
  const { numberOfDay } = req.query;

  // Get the current date and time
  const now = new Date();

 
    // Fetch all expiration records
    const getAllExpiration = await Expiration.find();

    // Filter and map the products with remaining days less than or equal to the specified number of days
    const dataExpire = getAllExpiration
      .map((exp) => {
        const differenceInMilliseconds = exp.expirationDate - now;
        const differenceInDays = Math.floor(
          differenceInMilliseconds / (1000 * 60 * 60 * 24)
        );

        // Only include products that are within the specified number of days
        if (differenceInDays <= numberOfDay) {
          return {
            ...exp._doc,
            differenceInDays,
          };
        }
        return null;
      })
      .filter((product) => product !== null); // Remove null entries

    return res.status(200).json({
      count: dataExpire.length,
      products: dataExpire,
    });
  };

