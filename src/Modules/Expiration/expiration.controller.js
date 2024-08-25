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