import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res,next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password,10);
  const newUser = new User({ name, email, password:hashedPassword});
  try{
    await newUser.save();
    res.status(201).json({"message":"data saved successfully"})
  }
  catch(error){
    next(error) // no need to write separately everytime the res.status().json() coode we have written a middleware in index.js
    // next(errorHandler)  for the custom errors

  }
 
};
