import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../dtos/user";
import { Request, Response } from "express";
import { UserModel } from "../models/user_model";
import {
  convertUserToJwtInfo,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth";

export const register = async (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    const userExistsCheck = await UserModel.findOne({ email: user.email });

    if (userExistsCheck) {
      throw Error("User already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    await UserModel.create({ ...user, password: hashedPassword });

    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user == null) throw Error("Invalid Credentials");

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) throw Error("Invalid Credentials");

    const accessToken = generateAccessToken(
      convertUserToJwtInfo(user),
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRATION
    );
    const refreshToken = generateRefreshToken(
      convertUserToJwtInfo(user),
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRATION
    );

    user.tokens = user.tokens ? [...user.tokens, refreshToken] : [refreshToken];
    await user.save();

    res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const logout = (req: Request, res: Response): void => {
  const refreshToken = req.headers.authorization?.split(" ")?.[1];
  if (!refreshToken) {
    res.status(401).send("No refresh token provided");
    return;
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, userInfo: User) => {
      if (err) {
        res.status(403).send("Unauthorized");
        return;
      }
      const userId = userInfo._id;
      try {
        const user = await UserModel.findById(userId);
        if (user == null) {
          res.status(403).send("Unauthorized");
          return;
        }
        if (!user.tokens.includes(refreshToken)) {
          user.tokens = [];
          await user.save();
          res.status(403).send("Unauthorized");
          return;
        }
        user.tokens = user.tokens.filter((token) => token !== refreshToken);
        await user.save();
        res.status(200).send("Logged out successfully");
      } catch (err) {
        res.status(403).send(err.message);
      }
    }
  );
};

export const refreshToken = async (req: Request, res: Response) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, userInfo: User) => {
      if (err) {
        res.status(403).send("Unauthorized");
        return;
      }

      const userId = userInfo._id;
      try {
        const user = await UserModel.findById(userId);
        if (user == null) {
          res.status(403).send("Unauthorized");
          return;
        }
        if (!user.tokens.includes(token)) {
          user.tokens = [];
          await user.save();
          res.status(403).send("Unauthorized");
          return;
        }

        const accessToken = generateAccessToken(
          convertUserToJwtInfo(user),
          process.env.ACCESS_TOKEN_SECRET,
          process.env.ACCESS_TOKEN_EXPIRATION
        );
        const refreshToken = generateRefreshToken(
          convertUserToJwtInfo(user),
          process.env.REFRESH_TOKEN_SECRET,
          process.env.REFRESH_TOKEN_EXPIRATION
        );

        user.tokens[user.tokens.indexOf(token)] = refreshToken;
        await user.save();
        res.status(200).send({ accessToken, refreshToken });
      } catch (err) {
        res.status(403).send(err.message);
      }
    }
  );
};
