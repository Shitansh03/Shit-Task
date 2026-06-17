const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            validate: {
                validator(v) {
                    return /\S+@\S+\.\S+/.test(v);
                },
                message: "Enter a valid Email",
            }
        },
        password: { type: String, select: false },
        googleId: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true, },
        toObject: { virtuals: true, },
    }
);

userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "user",
})

module.exports = mongoose.model("User", userSchema);