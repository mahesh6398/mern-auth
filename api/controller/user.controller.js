import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';
import User from "../model/user.model.js";

export const test = (req,res)=>{
    res.json({
        "message":"router working"
    })
}

export const updateUser = async (req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,'You Can Only Update Your Account'))
    }
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            {new:true}
        );
        const { password, ...rest } = updatedUser._doc;
        console.log(rest)
        res.status(200).json(rest);
    }catch(err){
        next(err)
    }

};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}