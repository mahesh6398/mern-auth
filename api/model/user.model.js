import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique: true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true,
        unique: true
    },
    profilePicture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVhtFJc9v3hEBfhJiOhYMS_60ieEbiOjPJyxl8F2dIBw&s",
    }
    
},{timestamps:true})

 const User = mongoose.model("User",UserSchema);
 export default User;