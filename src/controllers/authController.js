const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ username, email, password });
    await user.save();
    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }
  try {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });
        const newAccessToken = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken: newAccessToken });
      }
    );
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(400).json({ message: "No active session" });
    }
    user.refreshToken = null;
    await user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, refreshToken, logoutUser };
