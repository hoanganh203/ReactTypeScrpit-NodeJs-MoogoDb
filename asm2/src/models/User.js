

import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true,
    },

    role: {
        type: String,
        default: "member",
    },


},
    { timestamps: true, versionKey: false });
export default mongoose.model("User", userSchema);

