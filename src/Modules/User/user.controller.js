import User from "../../../DB/Models/user.model.js";
import Family from "../../../DB/Models/family.model.js";
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
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorClass("User not found", 400, "userId", "Get User By Id API")
    );
  }
  return res.status(200).json({ user });
}
