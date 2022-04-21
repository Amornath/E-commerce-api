export {};
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req: any, res: any) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};

const signOut = async (req: any, res: any) => {
  const authHeader = req.headers["authorization"];
  // jwt.sign(authHeader, "", { expiresIn: 1 }, (logout: any, err: any) => {
  //   if (logout) {
  //     res.send({ msg: "You have been Logged Out" });
  //   } else {
  //     res.send({ msg: "Error" });
  //   }
  // });
  jwt.sign(
    authHeader,
    process.env.JWT_SECRET,
    {
      expiresIn: 0,
    },
    (logout: any, err: any) => {
      if (logout) {
        res.send({ msg: "You have been Logged Out" });
      } else {
        res.send({ msg: "Error" });
      }
    }
  );
};

const googleSignup = async (req: any, res: any) => {
  const token = req.user.createJWT();
  res.json({ user: req.user, token });
};

module.exports = {
  register,
  login,
  signOut,
  googleSignup,
};
