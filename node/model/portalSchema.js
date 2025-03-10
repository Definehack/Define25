const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "Stock", "Crypto", "Real Estate", etc.
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    virtualBalance: { type: Number, default: 10000 }, 
    assets: [assetSchema]
});

const User = mongoose.model("User", userSchema);
const Asset = mongoose.model("Asset", assetSchema);

module.exports = { User, Asset };