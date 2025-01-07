import jwt from "jsonwebtoken";
import { User } from "../dtos/user";

export const generateAccessToken = (
  user: User,
  accessToken: string,
  expiresIn: string
) => jwt.sign(user, accessToken, { expiresIn });

export const generateRefreshToken = (
  user: User,
  refreshTokenSecret: string,
  expiresIn: string
) => jwt.sign(user, refreshTokenSecret, { expiresIn });
