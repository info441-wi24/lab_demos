const mongoose = require("mongoose");

async function addUser() {
    await mongoose.connect("mongodb+srv://weifan:info441@info441.wfotfpj.mongodb.net/user");
    const userSchema = new mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String
    });
    const userModel = mongoose.model("user", userSchema); 
    const User = new userModel({firstname: "weifan", lastname: "wu", email: "weifan@uw.edu"});
    await User.save();
}

addUser();