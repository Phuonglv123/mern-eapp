const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
    {
        product: {type: ObjectId, ref: "Product"},
        name: String,
        price: Number,
        count: Number,
        transaction_id: {},
        amount: {type: Number},
        address: String,
        status: {
            type: String,
            default: "Not processed",
            enum: ["Paid", "Not Paid", "Cancelled"] // enum means string objects
        },
        updated: Date,
        user: {type: ObjectId, ref: "User"}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);
