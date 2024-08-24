import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

import { sendEmailService } from "../../services/send-email.service.js";
import { ErrorClass } from "../../utils/error-class.utils.js";

import Admin_Volunteers from "../../../DB/Models/admin_volunteers.model.js";

//add Admin or volunteers
export const SignUp = async (req, res, next) => {
  const {
    firstName,
    secondName,
    thirdName,
    fourthName,
    email,
    password,
    role,
    SSN,
    age,
    gender,
    DOB,
    mobileNumber,
  } = req.body;
  // check email or ssn or mobile number unique

  const user = await Admin_Volunteers.findOne({ email, SSN, mobileNumber });
  if (user) {
    return next(
      new ErrorClass(
        "User already exist",
        400,
        "email or SSN or mobile number",
        "Add Admin or volunteers API"
      )
    );
  }

  const newUser = new Admin_Volunteers({
    firstName,
    secondName,
    thirdName,
    fourthName,
    fullName: `${firstName} ${secondName} ${thirdName} ${fourthName}`,
    email,
    password: hashSync(password, +process.env.SALT_ROUNDS), // hash password (+) convert string to number
    role,
    SSN,
    age,
    gender,
    DOB,
    mobileNumber,
  });

  // generate token
  const token = jwt.sign(
    { _id: newUser._id },
    process.env.CONFIRMATION_SECRET,
    {
      expiresIn: "10m",
    }
  );
  // confirmation Link
  const confirmationLink = `${req.protocol}://${req.headers.host}/admin-volunteers/confirm-email/${token}`;
  // send email
  const isEmailSent = await sendEmailService({
    to: email,
    subject: "Active Email",
    textMessage: "Active Email",
    htmlMessage: `<a href="${confirmationLink}">Click here to confirm your email To Active Email</a>`,
  });
  // check if email sent
  if (isEmailSent.rejected.length) {
    return next(
      new ErrorClass(
        "Email Not Sent",
        400,
        "Email Not Sent",
        email,
        "signUp api"
      )
    );
  }
  await newUser.save();

  return res.status(200).json({
    message: "Add Admin or volunteers Success",
    newUser,
  });
};
//------------------------
/**
* answer:
1- take token from params
try : 
2- decode token
3- find user by id
4- update user isConfirmed to true
5- return response
catch : 
1- if token expired
2- decode token
3- create new token 
4- create new conformation
5- send new email
6- check email send
7- if email send return response email send else return response error
 */

export const confirmEmail = async (req, res, next) => {
  const { token } = req.params;

  try {
    const { _id } = jwt.verify(token, process.env.CONFIRMATION_SECRET);
    const user = await Admin_Volunteers.findOneAndUpdate(
      { _id, isConfirmed: false },
      { isConfirmed: true },
      { new: true }
    );

    if (!user) {
      return next(new ErrorClass("User not found", 400, "Confirm Email"));
    }

    res.status(200).json({ message: "Email confirmed" });
  } catch (err) {
    // check token expired
    if (err.name === "TokenExpiredError") {
      const decoded = jwt.decode(token);
      // user data
      const user = await Admin_Volunteers.findById(decoded._id);

      if (user && !user.isConfirmed) {
        const newToken = jwt.sign(
          { _id: user._id },
          process.env.CONFIRMATION_SECRET,
          { expiresIn: "10m" }
        );
        // New confirmation Link
        const newConfirmationLink = `${req.protocol}://${req.headers.host}/admin-volunteers/confirm-email/${newToken}`;
        // send new email
        try {
          const isEmailSent = await sendEmailService({
            to: user.email,
            subject: "Email confirmation link expired",
            textMessage:
              "Hello, your email confirmation link has expired. Here is a new one.",
            htmlMessage: `<a href="${newConfirmationLink}">Click here to confirm your email</a>`,
          });

          // error if email not send
          if (isEmailSent.rejected.length) {
            return next(
              new ErrorClass("Email Not Sent", 400, user.email, "confirmEmail ")
            );
          }
          // if email send success
          return res.status(400).json({
            message:
              "Email confirmation link expired. A new confirmation link has been sent to your email.",
          });
        } catch (emailErr) {
          // if error in send new conformation
          return next(
            new ErrorClass(
              "Failed to send new confirmation email",
              500,
              emailErr.message
            )
          );
        }
      }

      return next(new ErrorClass("Token expired", 400, "Token expired"));
    }

    return next(new ErrorClass("Invalid token", 400, "Invalid token"));
  }
};
//----------------------------------------------------
// 2-signIn User

/*
 * answer:
 * after validation
  1- send user data if login in body
  2- check user found email or mobile number or recovery email and password
  3- check user active email
  4- create token
  5- update status user from offline to online
  6- if user found return token 
*/
export const signIn = async (req, res, next) => {
  // destruct data from req.body
  const { email, password, mobileNumber } = req.body;

  // Check if the user exists
  const user = await Admin_Volunteers.findOne({
    $or: [{ email }, { mobileNumber }],
  });
  if (!user) {
    return next(
      new ErrorClass(
        "Email or Mobile Number or Password is incorrect",
        400,
        { email, password, mobileNumber },
        "SignIn API"
      )
    );
  }
  // check email is active by comfirm email
  if (user.isConfirmed === false) {
    return next(
      new ErrorClass(
        "Please Frist Active Your Email ",
        400,
        user.email,
        "SignIn API"
      )
    );
  }

  // Verify the password
  const isPasswordValid = compareSync(password, user.password);
  if (!isPasswordValid) {
    return next(
      new ErrorClass(
        "Email or Mobile Number or Password or  Recovery Email is incorrect",
        400,
        { email, password, mobileNumber, recoveryEmail },
        "SignIn API"
      )
    );
  }

  // Sign a JWT token with user's ID and a secret key (make sure to use a strong secret)
  const token = jwt.sign({ userId: user._id }, process.env.LOGIN_SECRET, {
    expiresIn: "1h",
  }); // Token expires in 1 hour

  // Update status from online
  const updatedUser = await Admin_Volunteers.findByIdAndUpdate(user._id, {
    status: "online",
  });

  return res.status(200).json({ token });
};

//---------------------------------------
// logout user
/**
 * answer:
 * after authentication and validation
 * 1- user must be logged in
 * 2- user must be online
 * 3- user data send in token in header
 * 4- update the status of the user to "offline"
 * 5- return "Logout Successful"
 *
 */
export const logOut = async (req, res, next) => {
  // check user is online
  if (req.authUser.status !== "online") {
    return next(
      new ErrorClass(
        "User must be online",
        400,
        "User must be online",
        "logout API"
      )
    );
  }
  // Update the  status of the user to "offline"
  const updatedUser = await Admin_Volunteers.findByIdAndUpdate(
    req.authUser._id,
    {
      status: "offline",
    },
    { new: true }
  );
  // check user found
  if (!updatedUser) {
    return next(new ErrorClass("User not found", 404, "logout API"));
  }

  return res.status(200).json({ message: "LogOut Successful" });
};
