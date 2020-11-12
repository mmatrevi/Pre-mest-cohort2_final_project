const { response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/usermodel");
const auth = require("../middleware/auth");

//register route
router.post("/register", async (req, res) => {
  try {
    const { userName, password, phoneNumber } = req.body;

    //validate
    if (!userName || !password || !phoneNumber)
      return res.status(400).json({ msg: "Not all fields entered1!" });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "Password needs to atleast five characters long!" });
    if (phoneNumber.length < 10)
      return res.status(400).json({ msg: "Entered a valid phone number!" });

    const existingUser = await User.findOne({ userName: userName });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      password: passwordHash,
      phoneNumber,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login route

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    //validation
    if (!userName || !password)
      return res.status(400).json({ msg: "not all fields have been entered!" });

    const user = await User.findOne({ userName: userName });
    if (!user)
      return res
        .status(400)
        .json({ msg: "no account with this username exists!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token: token,
      user: {
        id: user._id,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    userName: user.userName,
    id: user._id,
  });
});

module.exports = router;
