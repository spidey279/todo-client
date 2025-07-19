import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import validator from "email-validator";

export const signInUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.json({ success: false, message: "Fill all the details pls" });
    }

    const niceEmail = validator.validate(email);

    if (!niceEmail) {
      return res.json({
        success: false,
        message: "email format is not correct, pls try again!",
      });
    }
    const usedEmail = await userModel.findOne({ email });

    if (usedEmail) {
      return res.json({ success: false, message: "Email already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

     await user.save();

    return res.json({ success: true, message: "User Registered!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const userPassword = user.password;

    const isPasswordMatch = await bcrypt.compare(password, userPassword);

    if (!isPasswordMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    return res.json({ success: true, message: "User Logged in!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
