import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    password,
    confirmPassword,
    role,
    gender,
    phone,
    dob,
    bio,
    email,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(200).json({ error: "Password does not match" });
  }

  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ error: "Username already exists" });
  }
  const emailAdress = await User.findOne({ email });
  if (emailAdress) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const slat = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, slat);

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
    gender,
    phone,
    dob,
    role,
    bio,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  });

  if (newUser) {
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      data: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        role: newUser.role,
        profilePic: newUser.profilePic,
      },
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: "Login successfully",
      data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
