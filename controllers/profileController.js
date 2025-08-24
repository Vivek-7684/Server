const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const passwordSchema = require('../../Server/utils/passwordSchema'); // Reusable schema

// view profile
exports.viewProfile = (req, res) => {

    try {
        User.getUsernameByEmail(req.Email, (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });

            if (result.length === 0) return res.status(404).json({ message: "User not found" });

            const user = result[0];
            res.status(200).json({
                username: user.username || "N/A",
                email: user.email || "N/A",
                phone: user.phone || "N/A",
                country: user.country || "N/A",
                state: user.state || "N/A",
                city: user.city || "N/A",
                user_role: user.user_role || "N/A",
                image: user.image ? user.image.toString('base64') : null
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }

};

// edit user profile
exports.editProfile = (req, res) => {

    try {
        let Email = req.Email;

        const { username, email, country, state, city } = req.body;

        const fields = [];
        const values = [];

        if (username) { fields.push("username = ?"); values.push(username); }
        if (email) { fields.push("email = ?"); values.push(email); }
        if (country) { fields.push("country = ?"); values.push(country); }
        if (state) { fields.push("state = ?"); values.push(state); }
        if (city) { fields.push("city = ?"); values.push(city); }

        if (fields.length === 0) {
            return res.status(400).json({ message: "No data to update" });
        }

        User.updateUser(fields, values, Email, (err) => {
            if (err) return res.status(500).json({ error: "Database error" });

            return res.status(200).json({ message: "Profile updated successfully" });
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }

};

// upload profile
exports.uploadProfileImage = (req, res) => {

    try {
        const Email = req.Email;

        const { profile_image } = req.body; // Base64 string from client

        if (!profile_image) {
            return res.status(400).json({ error: "No image provided" });
        }

        // Remove "data:image/png;base64,"
        const base64Data = profile_image.split(",")[1];

        // Convert to Buffer (binary) from base64 
        const imageBuffer = Buffer.from(base64Data, "base64"); // to save in DB.

        // Save Buffer as BLOB in DB
        User.updateUser(['image = ?'], [imageBuffer], Email, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json({ message: "Profile Image updated successfully" });
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// update password 

exports.updatePassword = (req, res) => {
    try {
        const email = req.Email; // From JWT middleware
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // 1. Validate input
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. Validate new password strength
        if (!passwordSchema.validate(newPassword)) {
            return res.status(400).json({
                message: "New password does not meet security requirements. (Min 4 chars, Max 8, 1 uppercase, 1 lowercase, 2 digits, no spaces)"
            });
        }

        // 3. Check confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirmation do not match" });
        }

        // 4. Fetch user from DB
        User.getUsernameByEmail(email, async (err, result) => {
            if (err) return res.status(500).json({ message: "Database error" });
            if (result.length === 0) return res.status(404).json({ message: "User not found" });

            const user = result[0];

            // 5. Verify old password
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Old password is incorrect" });
            }

            // 6. Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // 7. Update password in DB
            User.updateUser(['password = ?'], [hashedPassword], email, (err) => {
                if (err) return res.status(500).json({ message: "Database error" });
                return res.status(200).json({ message: "Password updated successfully" });
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};




