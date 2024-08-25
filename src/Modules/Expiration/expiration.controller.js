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
        startDate
    });

    return res.status(201).json({ expiration });

}
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
    return res.status(200).json({ count: expiration.length,expiration });

}
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

}
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

    return res.status(200).json({message:"Delete Expiration Success", expiration });
}
//--------------------------------
