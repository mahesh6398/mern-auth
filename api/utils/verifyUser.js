import jwt from "jsonwebtoken";
export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;

    if(!token) return next(401,"Your Not Authenticated");
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(403,"Token is not valid");

        req.user = user;
        next();
    })
}