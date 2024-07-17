import { ErrorClass } from "../utils/error-class.utils.js";

export const errorHandler = (API) => {
  return (req, res, next) => {
    Promise.resolve(API(req, res, next)).catch((err) => {
      next(new ErrorClass("Internal Server error", 500, err.message));
    });
  };
};

export const globaleResponse = (err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({
      message: "Fail response",
      err_msg: err.message,
      err_location: err.location,
      err_data: err.data,
    });
  }
};
