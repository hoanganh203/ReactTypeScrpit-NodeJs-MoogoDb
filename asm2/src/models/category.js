import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
},
    { timestamps: true, versionKey: false });



export default mongoose.model("Category", categorySchema);