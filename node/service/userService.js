const User = require("../model/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const path = require("path");
const fs = require("fs");

exports.createUser = async (name, email, password) => {
    try {
        const isFound = await User.findOne({ email });
        if (isFound) {
            return ({ success: false, message: "Email already exists" });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword });
            await user.save();
            return { success: true, message: "User created" };
        }
    } catch (err) {
        throw new Error(err.message);
    }

};

exports.verifyUser = async (email, password) => {
    try {
        const match = await User.findOne({ email });

        if (!match) {
            return { success: false, message: "Email not found" };
        }

        const isMatch = await bcrypt.compare(password, match.password);
        if (!isMatch) {
            return { success: false, message: "Invalid password" };
        }

        const token = jwt.sign(
            { userId: match._id, name: match.name, email: match.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { success: true, message: "User verified", token };
    } catch (err) {
        throw err;
    }
};



exports.saveExcelFile = async (file) => {
    try {
        const uploadDir = path.join(__dirname, "../../flask_backend/src/data");

        // Ensure the folder exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Save file in Flask's backend
        const filePath = path.join(uploadDir, file.filename);
        fs.renameSync(file.path, filePath); // Move file to final destination

        return filePath;
    } catch (error) {
        console.error("Error saving file:", error);
        throw new Error("File saving failed");
    }
};

exports.walletService = async (email, amount) => {
    try {
        const user = await User.findOne({
            email
        }); 
        if (!user) {
            return { success: false, message: "User not found" };
        }
        user.wallet += amount;
        await user.save();
        return { success: true, message: "Wallet updated" };
    } catch (error) {
        console.error("Error updating wallet:", error);
        throw new Error("Failed to update wallet");
    }
};