import { UserModel } from "../models/user_model";
import { Request, Response } from "express";
import { User } from "../dtos/user";
import { convertUserToPlain, generateAccessToken, generateRefreshToken } from "../utils/auth";
let refreshTokens: string[] = [];

export const register = async (req: Request, res: Response) => {
  const newUser: User = req.body;

  try {
    const userExistsCheck = await UserModel.findOne({ email: newUser.email });

    if (userExistsCheck) {
      throw Error("User already exists");
    }

    const user: User = await UserModel.create(newUser);
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email, password });

    if (!user) {
      throw Error("Invalid Cardentials");
    }

    const accessToken = generateAccessToken(
      convertUserToPlain(user),
      process.env.ACCESS_TOKEN_SECRET,
      process.env.TOKEN_EXPIRATION
    );

    const refreshToken = generateRefreshToken(
      convertUserToPlain(user),
      process.env.REFRESH_TOKEN_SECRET,
      "1d"
    );
    
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.status(200).send(accessToken);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const logout = (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw Error("No refresh token provided");
  }

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.clearCookie("refreshToken");
  res.status(200).send("Logged out successfully");
};
