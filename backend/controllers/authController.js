const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        email = email.toLowerCase().trim();
        name = name.trim();

        const userExist = await userSchema.findOne({ email });

        if (userExist) {
            if (userExist.googleId) {
                return res.status(400).json({
                    success: false,
                    message: "Account exists with Google, please login with Google"
                });
            }

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userSchema.create({
            name,
            email,
            password: hashPassword,
        });

        res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: generateToken(user),
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required"
            });
        }

        email = email.toLowerCase().trim();

        const user = await userSchema.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (!user.password) {
            return res.status(400).json({
                success: false,
                message: "Please login with Google"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: generateToken(user),
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to login"
        });
    }
};

const googleAuth = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "No credential provided"
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email) {
            return res.status(400).json({
                success: false,
                message: "Invalid Google token"
            });
        }

        if (!payload.email_verified) {
            return res.status(400).json({
                success: false,
                message: "Google email not verified"
            });
        }

        const email = payload.email.toLowerCase();
        const name = payload.name?.trim() || email.split("@")[0]; // 🔥 fallback fix
        const googleId = payload.sub;

        let user = await userSchema.findOne({ email });

        let isLinked = false;

        if (user) {
            if (user.googleId && user.googleId !== googleId) {
                return res.status(400).json({
                    success: false,
                    message: "Google account mismatch"
                });
            }

            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
                isLinked = true;
            }

        } else {
            user = await userSchema.create({
                name,
                email,
                googleId
            });
        }

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: generateToken(user),
            linked: isLinked
        });

    } catch (error) {
        console.log("GOOGLE AUTH ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Google authentication failed",
            error: process.env.NODE_ENV === "development"
                ? error.message
                : undefined
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    googleAuth
};