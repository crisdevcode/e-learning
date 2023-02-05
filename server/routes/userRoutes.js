import express from "express";
import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const userRoutes = express.Router();

//TODO: redefine expiresIn
const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "60d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401).send("Correo electrónico o contraseña no válidos");
    throw new Error("Usuario no encontrado.");
  }
});

// POST register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("Ya tenemos una cuenta con esa dirección de correo electrónico.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(400).send("No pudimos registrarte.");
    throw new Error("Algo salió mal. Por favor revisa tus datos y vuelve a intentarlo.");
  }
});

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);

export default userRoutes;