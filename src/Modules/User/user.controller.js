import { ErrorClass } from "../../utils/error-class.utils.js";

import User from "../../../DB/Models/user.model.js";
import Family from "../../../DB/Models/family.model.js";
import Need from "../../../DB/Models/need.model.js";
// add user

/*
1- destruct data from body
2- check family exists
3- check ssn unique 
4- take new instance from user
5- save data in database
6- return user created successfully

*/

export const addUser = async (req, res, next) => {
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

  // destruct data from body
  const {
    firstName,
    secondName,
    thirdName,
    fourthName,
    SSN,
    age,
    gender,
    comment,
  } = req.body;

  const family = await Family.findById(req.params.familyId);
  if (!family) {
    return next(
      new ErrorClass("Family not found", 400, "familyId", "Add User API")
    );
  }
  const user = await User.findOne({ SSN });
  if (user) {
    return next(
      new ErrorClass("User already exist", 400, "SSN", "Add User API")
    );
  }
  const newUser = new User({
    firstName,
    secondName,
    thirdName,
    fourthName,
    fullName: `${firstName} ${secondName} ${thirdName} ${fourthName}`,
    SSN,
    age,
    gender,
    comment,
    familyId: family._id,
    addedBy: req.authUser._id,
  });
  const savedUser = await newUser.save();
  return res
    .status(200)
    .json({ message: "User created successfully", savedUser });
};
//------------------------
//get all User

/*
1- find all user
2- return all user
*/

export const getAllUser = async (req, res) => {
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

  const user = await User.find();
  return res.status(200).json({ count: user.length, user });
};
//-----------------------
//get specific user by id

/*
1- find user by id
2- check user exist
3- return user
*/

export const getUserById = async (req, res, next) => {
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

  // find user by id
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorClass("User not found", 400, "userId", "Get User By Id API")
    );
  }
  return res.status(200).json({ user });
};

//--------------------------------
// delete user by id

/*
1- find user by id
2- check user exist
3- delete user
4- return delete user success
*/

export const deleteUserById = async (req, res, next) => {
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
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return next(
      new ErrorClass("User not found", 400, "userId", "Delete User API")
    );
  }
  // delete needs related to user
  await Need.deleteMany({ member: deletedUser._id });
  return res.status(200).json({ message: "Delete User Success", deletedUser });
};
//--------------------------
//update User

/*
1- find user by id
2- check user exist
3- destruct data from req.body
4- update user
5- return update user success
*/

export const updateUserById = async (req, res, next) => {
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
  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorClass("User not found", 400, "userId", "Update User API")
    );
  }
  const { firstName, secondName, thirdName, fourthName, SSN, age, gender } =
    req.body;
  if (firstName) {
    user.firstName = firstName;
  }
  if (secondName) {
    user.secondName = secondName;
  }
  if (thirdName) {
    user.thirdName = thirdName;
  }
  if (fourthName) {
    user.fourthName = fourthName;
  }
  const nameParts = [
    firstName || user.firstName,
    secondName || user.secondName,
    thirdName || user.thirdName,
    fourthName || user.fourthName,
  ];
  user.fullName = nameParts.join(" ");
  if (SSN) {
    if (user.SSN !== SSN) {
      const checkSSN = await User.findOne({ SSN });
      if (checkSSN) {
        return next(
          new ErrorClass("User already exist", 400, "SSN", "Update User API")
        );
      }
      user.SSN = SSN;
    }
  }

  if (age) {
    user.age = age;
  }
  if (gender) {
    user.gender = gender;
  }
  const updatedUser = await user.save();
  return res.status(200).json({ message: "Update User Success", updatedUser });
};
